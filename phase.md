## link to the deployed befit web app: 
https://befit-h0dab6btfpa7dzdq.southafricanorth-01.azurewebsites.net/ 

## 💭 Reflection on IaC vs Manual Deployment

While working on this project, we experienced both manual deployment through the Azure portal and the conceptual benefits of Infrastructure as Code (IaC).

### 🛠️ Challenges with Manual Deployment

- **Error-Prone Configuration:** Manually setting up resources like Web Apps, Container Registries, and IAM permissions often led to misconfigurations (e.g., double-tagged image names, missing permissions).
- **Lack of Repeatability:** Reproducing the same environment for staging or production required repeating steps manually, increasing risk and time.
- **Inefficiency:** The process involved switching between the Azure portal and terminal, leading to delays and a fragmented workflow.

### 🧱 Value of Infrastructure as Code (IaC)

If we had used tools like **Terraform** or **Bicep**, we could have:
- Version-controlled the entire infrastructure setup
- Reduced manual steps and human errors
- Automatically provisioned Web Apps, roles, ACR, and networking consistently across environments

This experience highlighted the importance of IaC for production-ready, scalable systems. While manual deployment helped in understanding Azure fundamentals, IaC would have greatly improved deployment speed, maintainability, and confidence in infrastructure consistency.
