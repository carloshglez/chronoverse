#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Information') {
            steps {
                echo "Running Build ${env.BUILD_ID} on ${env.JENKINS_URL}"
                echo "============BUILD=============="
                echo "Build Display Name: ${env.BUILD_DISPLAY_NAME}"
                echo "Build Tag: ${env.BUILD_TAG}"
                echo "Build URL: ${env.BUILD_URL}"
                echo "=============JOB==============="
                echo "Job Name: ${env.JOB_NAME}"
                echo "Job Base Name: ${env.JOB_BASE_NAME}"
                echo "Job URL: ${env.JOB_URL}"
                echo "=========ENVIRONMENT==========="
                echo "Executor Number: ${env.EXECUTOR_NUMBER}"
                echo "Node Name: ${env.NODE_NAME}"
                echo "Workspace: ${env.WORKSPACE}"
                echo "Home: ${env.JENKINS_HOME}"
            }
        }
        stage('Build') {
            steps {
                echo 'Building..'
                bat 'npm install'
                bat 'npm run-script build'
            }
        }
        stage('Test') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Testing..'
                bat 'npm run-script lint'
            }
        }
        stage('Deploy') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Deploying....'
            }
        }
        stage('Archive') {
            when {
              expression {
                currentBuild.result == null || currentBuild.result == 'SUCCESS'
              }
            }
            steps {
                echo 'Archiving....'
                archiveArtifacts artifacts: 'dist/*.js', fingerprint: true
                archiveArtifacts artifacts: '*.html', fingerprint: true
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
