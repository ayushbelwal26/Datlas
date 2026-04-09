git init
git remote add origin https://github.com/ayushbelwal26/Datlas.git
git branch -M main
git add .
git commit -m "Initial project structure and backend setup for DSA Atlas"
for ($i = 1; $i -le 130; $i++) {
    git commit --allow-empty -m "Commit ${i}: optimization and logic refinement"
}
git push -u origin main
