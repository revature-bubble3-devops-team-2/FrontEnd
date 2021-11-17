def discordurl = "https://discord.com/api/webhooks/908752964670337095/S9h_mpTXF3r2IOgzYnB9zefPAMpCiUaGOBgAFoEgIhFGUxMxR6oJBGq-ijpqtly9Lybz"
pipeline {
   agent any

   options {disableConcurrentBuilds()}

   environment {
      PORT = 80
      IMAGE_TAG = "bubblefeimg"
      CONTAINER_NAME = "bubblefe"
   }

   tools { nodejs "node"}

   stages {
      stage('Install Dependencies') {
         steps {
            sh 'npm install'
            discordSend description: ":construction: *Updated Dependencies*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
      stage('build') {
         steps {
            sh 'ng build --aot --output-hashing none'
            discordSend description: ":construction_site: *Built Production Model*", result: currentBuild.currentResult, webhookURL: discordurl
            sh 'ls ./dist/bubble/'
         }
      }
      stage('remove previous docker image') {
         steps {
               sh 'docker stop ${CONTAINER_NAME} || true'
               sh 'docker rmi ${IMAGE_TAG} || true'
               discordSend description: ":axe: *Removed Previous Docker Artifacts*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
      stage('create docker image') {
         steps {
               sh 'docker build -t ${IMAGE_TAG} .'
               discordSend description: ":screwdriver: *Built New Docker Image*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
      stage('create container') {
         steps {
               sh 'docker run -it --rm -p ${PORT}:${PORT} -d --name ${CONTAINER_NAME} ${IMAGE_TAG}'
               discordSend description: ":whale: *Running Docker Container*", result: currentBuild.currentResult, webhookURL: discordurl
         }
      }
   }
   post {
      failure {
         discordSend description: ":warning: **Pipeline Failure!**", result: currentBuild.currentResult, webhookURL: discordurl
         sh 'docker container ls'
      }
      success {
         discordSend description: ":potable_water: **Pipeline Successful!**", result: currentBuild.currentResult, webhookURL: discordurl
         sh 'docker container ls --no-trunc'
      }
   }
}