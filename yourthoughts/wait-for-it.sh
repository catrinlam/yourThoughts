#!/usr/bin/env bash
# wait-for-it.sh

# Usage: ./wait-for-it.sh host:port [-- command args]
#    -h|--host HOST | Host or IP under test
#    -p|--port PORT | TCP port under test
#    Alternatively, you can use the first positional argument with a colon
#    to separate host and port. For example, host:port.

TIMEOUT=15
QUIET=0

echoerr() {
    if [[ "$QUIET" -ne 1 ]]; then echo "$@" 1>&2; fi
}

usage() {
    exitcode="$1"
    cat << USAGE >&2
Usage:
    $cmdname host:port [-t timeout] [-- command args]
    -q | --quiet                        Do not output any status messages
    -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
    -- COMMAND ARGS                     Execute command with args after the test finishes
USAGE
    exit "$exitcode"
}

wait_for() {
    if [[ "$TIMEOUT" -gt 0 ]]; then
        echo "Waiting for $HOST:$PORT to become available for up to $TIMEOUT seconds."
    else
        echo "Waiting for $HOST:$PORT to become available."
    fi
    start_ts=$(date +%s)
    while :
    do
        if [[ "$TIMEOUT" -gt 0 ]]; then
            now_ts=$(date +%s)
            elapsed=$(( now_ts - start_ts ))
            if [[ "$elapsed" -ge "$TIMEOUT" ]]; then
                echo "Timeout occurred after waiting $TIMEOUT seconds for $HOST:$PORT."
                return 1
            fi
        fi
        (echo > /dev/tcp/$HOST/$PORT) >/dev/null 2>&1
        result=$?
        if [[ "$result" -eq 0 ]]; then
            if [[ "$TIMEOUT" -gt 0 ]]; then
                echo "$HOST:$PORT is available after $elapsed seconds."
            else
                echo "$HOST:$PORT is available."
            fi
            break
        fi
        sleep 1
    done
    return 0
}

wait_for_wrapper() {
    if [[ "$QUIET" -eq 1 ]]; then
        wait_for "$@" >/dev/null
    else
        wait_for "$@"
    fi
    RESULT=$?
    if [[ "$RESULT" -ne 0 ]]; then
        echo "Operation timed out" >&2
        exit 1
    fi
    if [[ $# -gt 0 ]]; then
        exec "$@"
    fi
}

# process arguments
while [[ $# -gt 0 ]]
do
    case "$1" in
        *:* )
        HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
        PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [[ "$TIMEOUT" =~ ^[0-9]+$ ]]; then
            shift 2
        else
            echoerr "Error: Timeout must be an integer."
            exit 1
        fi
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        if ! [[ "$TIMEOUT" =~ ^[0-9]+$ ]]; then
            echoerr "Error: Timeout must be an integer."
            exit 1
        fi
        shift 1
        ;;
        --)
        shift
        WAITFORIT_CLI=("$@")
        break
        ;;
        --help)
        usage 0
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage 1
        ;;
    esac
done

if [[ "$HOST" == "" || "$PORT" == "" ]]; then
    echoerr "Error: you need to provide a host and port to test."
    usage 2
fi

wait_for_wrapper "${WAITFORIT_CLI[@]}"

