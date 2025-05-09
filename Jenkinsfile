pipeline {
    agent any  

    environment {
        
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials-id'
        DOCKER_HUB_REPO = 'secloud007/animerepo'
        IMAGE_TAG = "animeimage"  
        EKS_CLUSTER_NAME = 'CICluster'
        AWS_REGION = 'ap-south-1'  
    }

    stages {
        stage('Checkout') {
            steps {
                
                git 'https://github.com/alok1327/AnimeProject.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    
                    sh """
                    docker build -t ${DOCKER_HUB_REPO}:${IMAGE_TAG} .
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CREDENTIALS, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh """
                        echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    
                    sh """
                    docker push ${DOCKER_HUB_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

           stage('Configure kubectl for EKS') {
            steps {
                script {
                    
                    sh """
                    aws eks --region ${AWS_REGION} update-kubeconfig --name ${EKS_CLUSTER_NAME}
                    """
                }
            }
        }

        stage('Deploy to EKS') {
            steps {
                script {
                    
                    sh """
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                    """
                }
            }
        }
    }

    post {
        always {
            
            sh 'docker system prune -af'
        }
        success {
            echo "Application deployed successfully to EKS!"
        }
        failure {
            echo "Build or deployment failed."
        }
    }
}
