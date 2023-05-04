param ($DockerAction = $(throw "DockerAction parameter is required."))

function DockerBuild {
    docker-compose build
}

function DockerUp {
    $NgProject = Read-Host "Enter Angular app name"
    & "docker-compose up -d"
}

function DockerDown {
    docker-compose down -v
}

function DockerPrune {
    docker system prune
}

Switch ($DockerAction) {
    "build" {
        DockerBuild;
        Break
    }
    "up" {
        DockerUp;
        Break
    }
    "down" {
        DockerDown;
        Break
    }
    "prune" {
        DockerPrune;
        break;
    }
    Default {
        "Unrecognized docker command."
    }
}
