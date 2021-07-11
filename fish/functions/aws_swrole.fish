function aws_swrole -d "Switch AWS IAM Roles and start new session."
    set script_name (basename $_)

    set ini_file $HOME/.aws/config

    if [ ! -f $ini_file ]
        echo >&2 "Not found ~/.aws/config"
        echo >&2 "------------------------------"
        echo >&2 "[profile dest]"
        echo >&2 "role_arn = arn:aws:iam::<Account ID>:role/<role>"
        echo >&2 "source_profile = <AWS Profile>"
        echo >&2 "color = <ANSI Color>"
        echo >&2 "------------------------------"
        return
    end

    getopts $argv | while read -l key value
        switch $key
            case _
                set dest_aws $value
            case o
                set out_exports true
                set dest_aws $value
            case '*'
                set opt_error 1
                and break
        end
    end

    if [ $opt_error ]
        echo >&2 "Usage: $script_name [-o] <aws profile>"
        return
    end

    if [ "$dest_aws" = "" ]
        echo >&2 "Usage: $script_name [-o] <aws profile>"
        echo >&2 ""
        echo >&2 "Defined profiles:"
        for i in ( grep -E '\[profile\s.+\]' $ini_file )
            echo $i | sed 's/\[profile /   /' | sed 's/\]//' | cat >&2
        end
        return
    end

    set target "profile $dest_aws"

    eval (sed -e 's/[[:space:]]*\=[[:space:]]*/=/g' \
            -e 's/[;#].*$//' \
            -e 's/[[:space:]]*\$//' \
            -e 's/^[[:space:]]*//' \
            -e "s/^\(.*\)=\([^\"']*\)\$/set \1 \"\2\";/" \
            < $ini_file \
            | sed -n -e "/^\[$target\]/,/^\s*\[/{/^set/p;}")

    if [ "$source_profile" != "" ]
        set profile "--profile $source_profile"
    else
        set profile ""
    end

    if [ -z "$color" ]
        set color "001"
    end

    set sess_name "my_"$dest_aws"_session"

    if [ -z "$mfa_serial" ]
        set aws_command "aws sts assume-role --role-arn $role_arn --role-session-name $sess_name $profile"
    else
        read -p "set_color green; echo -n 'Enter MFA code > '; set_color normal; " TOKEN
        if [ "$TOKEN" = "" ]
            then
            return
        end
        set token_code "--serial-number $mfa_serial --token-code $TOKEN"
        set aws_command "aws sts assume-role --role-arn $role_arn --role-session-name $sess_name $token_code $profile"
    end

    set result (eval $aws_command)

    if [ $status -ne 0 ]
        echo "Failed"
        return
    end

    set items (echo $result | jq -r '.Credentials |  .AccessKeyId, .SecretAccessKey, .SessionToken ' )

    set access_key $items[1]
    set secret_key $items[2]
    set sess_token $items[3]


    if [ $out_exports ]
        echo "set -gx AWS_ACCESS_KEY_ID $access_key"
        echo "set -gx AWS_SECRET_ACCESS_KEY $secret_key"
        echo "set -gx AWS_SESSION_TOKEN $sess_token"
    else
        set -gx AWS_COLOR $color
        set -gx SWITCH_TARGET $dest_aws
        set -gx AWS_ACCESS_KEY_ID $access_key
        set -gx AWS_SECRET_ACCESS_KEY $secret_key
        set -gx AWS_SESSION_TOKEN $sess_token

        function fish_right_prompt -d 'bobthefish is all about the right prompt'
            set -l __bobthefish_left_arrow_glyph \uE0B3
            if [ "$theme_powerline_fonts" = "no" ]
                set __bobthefish_left_arrow_glyph '<'
            end

            set_color $fish_color_autosuggestion
            set_color -b $AWS_COLOR
            echo -e "[$SWITCH_TARGET] "
            __bobthefish_timestamp
            set_color normal
        end

    end

end
