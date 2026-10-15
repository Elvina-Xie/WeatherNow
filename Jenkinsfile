pipeline {
    agent any
    options { timestamps() }
    stages {
        stage('Checkout Source') {
            steps {
                checkout scm
                echo 'Source code retrieved from GitHub.'
            }
        }
        stage('Validate Project Files') {
            steps {
                script {
                    def required = ['index.html', 'style.css', 'script.js', 'Dockerfile']
                    required.each { f ->
                        if (!fileExists(f)) { error("Required file missing: ${f}") }
                    }
                    echo 'All required files are present.'
                }
            }
        }
        stage('Test Website') {
            steps {
                script {
                    def html = readFile('index.html')
                    def js = readFile('script.js')
                    if (!html.contains('<!DOCTYPE html>')) { error('index.html: missing DOCTYPE') }
                    if (!html.contains('style.css') || !html.contains('script.js')) { error('index.html: must link style.css and script.js') }
                    if (!js.contains('open-meteo.com')) { error('script.js: Open-Meteo API URL not found') }
                    def open = js.count('{'), close = js.count('}')
                    if (open != close) { error("script.js: unbalanced braces (${open} open, ${close} close)") }
                    echo 'Basic HTML and JavaScript checks passed.'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t weathernow:latest .'
                echo 'Docker image weathernow:latest built successfully. (Image is built only, not deployed.)'
            }
        }
    }
    post {
        success { echo 'Pipeline finished successfully.' }
        failure { echo 'Pipeline failed. Check the stage logs above.' }
    }
}
