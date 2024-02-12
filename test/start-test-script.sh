#!/bin/bash

while true; do
    read -p "Enter a command: " command

    case $command in
        start)
            echo "Starting server..."
            # Add your server start logic here
            ;;
        stop)
            echo "Stopping server..."
            # Add your server stop logic here
            ;;
        status)
            echo "Server status: running"
            ;;
        exit)
            echo "Exiting server..."
            break
            ;;
        *)
            echo "Invalid command"
            ;;
    esac
done
