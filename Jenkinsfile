#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'npm install'
                bat 'npm run-script build'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Archive') {
            steps {
                echo 'Archiving....'
                archiveArtifacts artifacts: 'dist/*.js', fingerprint: true
            }
        }
    }
}

/*
node {
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.houston.entsvcs.net/carlos-horacio-gonzalez-gordillo/react-game.git'
      bat 'git checkout develop'
      bat 'git pull'
   }
   stage('Build') {
      if (isUnix()) {
          echo 'NOT IMPLEMENTED'
      } else {
         bat 'npm install'
         bat 'npm run-script build'
      }
   }
   stage('Results') {
      echo 'DONE'
   }
}
*/
