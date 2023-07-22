# sh-bang
# Docker commands runner

docker_build() {
  eval "docker-compose build"
}

docker_up() {
  read -r -p "Enter Angular app name [admin | user] => " ng_project
  eval "NG_PROJECT=${ng_project} docker-compose up -d"
}

docker_start() {
  eval "docker-compose start"
}

docker_down() {
  eval "docker-compose down -v"
}

docker_stop() {
  eval "docker-compose stop"
}

docker_prune() {
  eval "docker system prune"
}

main() {
  read -r -p "Enter docker command [build, up, start, down, stop, prune] => " docker_command
  case ${docker_command} in
  "build") docker_build
    ;;
  "up") docker_up
  ;;
  "start") docker_start
  ;;
  "down") docker_down
  ;;
  "stop") docker_stop
  ;;
  "prune") docker_prune
  ;;
  "*") echo "Unrecognized docker command."
  ;;
  esac
}

main

