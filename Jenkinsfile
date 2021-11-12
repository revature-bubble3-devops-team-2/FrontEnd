def discordurl = "https://discord.com/api/webhooks/908752964670337095/S9h_mpTXF3r2IOgzYnB9zefPAMpCiUaGOBgAFoEgIhFGUxMxR6oJBGq-ijpqtly9Lybz"
pipeline {
   agent any

   tools { nodejs "node"}

   stages {
      stage('checkout') {
          steps {
            discordSend description: ":cyclone: *Cloning Repo*", result: currentBuild.currentResult, webhookURL: discordurl
            checkout scm
         }
      }
      stage('Install Dependencies') {
         steps {
            discordSend description: ":construction: *Updating Dependencies*", result: currentBuild.currentResult, webhookURL: discordurl
            sh 'npm install'
         }
      }
      stage('build') {
         steps {
            discordSend description: ":construction_site: *Building Angular*", result: currentBuild.currentResult, webhookURL: discordurl
            sh 'ng build --aot'
         }
      }
   }
   post {
      success {
         discordSend description: ":whale2: **Ready for Docker pick up**", result: currentBuild.currentResult, webhookURL: discordurl
      }
   }
}