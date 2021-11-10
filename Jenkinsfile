pipeline {
   agent any

   stages {
      stage('checkout') {
          steps {
            checkout scm
          }
      }
      stage('build') {
         steps {
            sh 'ng build -aot'
         }
      }
   }
}