pipeline {
   
  agent {
    docker { image 'node:latest' }
  }
  
   environment {
      IMAGE_TAG = "teammagma/bubblefront"
      CONTAINER_NAME = "bubblefront"
      CRED = "dockerhub"
   }

   stages {
      stage('Install Dependencies') {
         steps {
            sh 'npm install'
            sh 'ng --version'
         }
      }
      stage('Build Angular Files') {
         steps {
            sh 'ng build --aot --output-hashing none'
            sh 'ls ./dist/bubble/'
         }
      }
      stage('Remove Previous Artifacts') {
         steps {
               sh 'docker stop ${CONTAINER_NAME} || true'
               sh 'docker rmi ${IMAGE_TAG} || true'
         }
      }
      stage('Create Image') {
         steps {
               sh 'docker build -t ${IMAGE_TAG} .'
         }
      }
      stage('Start Container') {
         steps {
               sh 'docker run --rm -p 80:80 -d --name ${CONTAINER_NAME} ${IMAGE_TAG}'
         }
      }
      stage('Push to DockerHub') {
         steps {
            script {
               docker.withRegistry('', CRED) {
                  docker.image(IMAGE_TAG).push()
               }
            }
         }
      }
   }
}
