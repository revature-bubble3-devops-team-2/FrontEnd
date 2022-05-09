pipeline {
   agent any

   options {
      buildDiscarder(logRotator(daysToKeepStr: '7', numToKeepStr: '1'))
      disableConcurrentBuilds()
   }

   environment {
      IMAGE_TAG = "teammagma/bubblefront"
      CONTAINER_NAME = "bubblefront"
      CRED = "dockerhub"
   }

   tools { nodejs "node"}

   stages {
      stage('Install Dependencies') {
         steps {
            sh 'npm install'
            // discordSend description: ":construction: *Updated Dependencies*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
         }
      }
      stage('Build Angular Files') {
         steps {
            sh 'ng build --aot --output-hashing none'
            // discordSend description: ":construction_site: *Built Production Model*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
            sh 'ls ./dist/bubble/'
         }
      }
      stage('Remove Previous Artifacts') {
         steps {
               sh 'docker stop ${CONTAINER_NAME} || true'
               sh 'docker rmi ${IMAGE_TAG} || true'
               // discordSend description: ":axe: *Removed Previous Docker Artifacts*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
         }
      }
      stage('Create Image') {
         steps {
               sh 'docker build -t ${IMAGE_TAG} .'
               // discordSend description: ":screwdriver: *Built New Docker Image*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
         }
      }
      stage('Start Container') {
         steps {
               sh 'docker run --rm -p 80:80 -d --name ${CONTAINER_NAME} ${IMAGE_TAG}'
               // discordSend description: ":whale: *Running Docker Container*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
         }
      }
      stage('Push to DockerHub') {
         steps {
            script {
               docker.withRegistry('', CRED) {
                  docker.image(IMAGE_TAG).push()
               }
            }
            // discordSend description: ":face_in_clouds: *Pushed Latest to DockerHub*", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
         }
      }
   }
   // post {
   //    failure {
   //       discordSend description: ":warning: **Pipeline Failure!**", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
   //    }
   //    success {
   //       discordSend description: ":potable_water: **Pipeline Successful!**", result: currentBuild.currentResult, webhookURL: env.WEBHO_FE
   //       sh 'docker container ls --no-trunc'
   //    }
   // }
}
