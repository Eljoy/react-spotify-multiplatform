case "$1" in
"") FILE=../.env ;;
*) FILE="$1" ;;
esac

if [[ ! -f "$FILE" ]]; then
  touch "$FILE"
  {
    printf "REACT_APP_CLIENT_ID=\n"
    printf "REACT_APP_CLIENT_SECRET=\n"
    printf "REACT_APP_REDIRECT_URL=\n"
  } >>"$FILE"
fi
