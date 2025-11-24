# Instructor Guide - CI/CD Assessment

## Overview

This assessment is designed to evaluate students' practical skills in Docker, CI/CD, and DevOps fundamentals at a Junior DevOps Engineer level.

## Assessment Structure

### Duration
- **Total Time:** 2 days (16 hours)
- **Day 1:** Dockerization and Database Setup (8 hours)
- **Day 2:** CI/CD Pipeline and Security (8 hours)

### Difficulty Level
Junior DevOps Engineer - Students should have:
- Basic understanding of Docker
- Knowledge of CI/CD concepts
- Familiarity with Git and GitHub
- Understanding of databases
- Basic security awareness

## What Students Need to Complete

### Day 1 Tasks
1. **Dockerfile Creation** - Multi-stage build, optimization, security
2. **Docker Compose Setup** - PostgreSQL + Next.js app orchestration
3. **Database Connection** - Proper configuration and initialization
4. **Testing** - Ensure all tests pass

### Day 2 Tasks
1. **Build Pipeline** - GitHub Actions CI workflow
2. **Test Pipeline** - Automated testing with coverage
3. **Quality Checks** - Linting, formatting, security scanning
4. **Release Workflow** - Docker image building and publishing
5. **Security Hardening** - Best practices implementation
6. **Documentation** - Complete README

## Evaluation Criteria

### Technical Implementation (60%)
- **Docker (20%)**: Multi-stage builds, optimization, security
- **Database (10%)**: Configuration, connection, persistence
- **CI/CD (20%)**: Pipeline functionality, coverage, quality checks
- **Security (10%)**: Secrets management, input validation, best practices

### Code Quality (20%)
- Test coverage (minimum 60%)
- Code formatting and linting
- Type safety

### Documentation (10%)
- README completeness
- Clear instructions
- Examples

### Best Practices (10%)
- Git practices
- Project structure
- Error handling

## Expected Deliverables

### Required Files
1. `Dockerfile` - Optimized, multi-stage
2. `.dockerignore` - Proper exclusions
3. `docker-compose.yml` - Complete orchestration
4. `.github/workflows/ci.yml` - CI pipeline
5. `.github/workflows/release.yml` - Release workflow (or combined)
6. `README.md` - Complete documentation
7. `.env.example` - Environment variable template

### Repository Requirements
- All code committed
- Clear commit messages
- No secrets in code
- `.env` NOT committed
- Proper `.gitignore`

## Common Issues Students May Face

### Issue 1: Database Connection
**Problem:** Application can't connect to database
**Solution:** Check DATABASE_URL format, container networking, database readiness

### Issue 2: Tests Failing in CI
**Problem:** Tests pass locally but fail in GitHub Actions
**Solution:** Ensure PostgreSQL service is configured, check environment variables

### Issue 3: Docker Build Fails
**Problem:** Build errors or large image size
**Solution:** Check Dockerfile syntax, use multi-stage builds, optimize layers

### Issue 4: CI Pipeline Timeout
**Problem:** Pipeline takes too long or times out
**Solution:** Implement caching, optimize test execution, use parallel jobs

## Grading Rubric

### Excellent (90-100%)
- All tasks completed perfectly
- Advanced optimizations implemented
- Excellent documentation
- Security best practices followed
- Clean, maintainable code

### Good (75-89%)
- All tasks completed
- Minor issues or missing optimizations
- Good documentation
- Most best practices followed

### Satisfactory (60-74%)
- Most tasks completed
- Some issues present
- Basic documentation
- Some best practices followed

### Needs Improvement (<60%)
- Incomplete tasks
- Significant issues
- Poor documentation
- Missing best practices

## Tips for Students

1. **Start Early**: Don't wait until the last minute
2. **Read Instructions**: Carefully review ASSESSMENT.md
3. **Test Locally**: Ensure everything works before pushing
4. **Check CI**: Monitor pipeline runs and fix issues promptly
5. **Document**: Write clear README and comments
6. **Ask Questions**: Don't hesitate to ask for clarification

## Resources to Share

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Assessment Validation

Before distributing to students, verify:

- [ ] Application code is complete and functional
- [ ] Tests are properly configured
- [ ] No Dockerfiles present (students create them)
- [ ] No docker-compose.yml present (students create it)
- [ ] No CI/CD workflows present (students create them)
- [ ] Environment variables documented
- [ ] Instructions are clear and complete
- [ ] Example files are provided where helpful

## Post-Assessment Review

After students submit:

1. **Automated Checks**
   - CI pipeline status
   - Test results
   - Code quality metrics

2. **Manual Review**
   - Docker implementation quality
   - CI/CD pipeline structure
   - Documentation completeness
   - Security practices

3. **Functional Testing**
   - Run application locally
   - Test all features
   - Verify database operations

## Support During Assessment

- Provide clarification on requirements
- Help with technical blockers
- Review approach (not implementation)
- Answer questions about tools/technologies

## Feedback Template

Use this template for student feedback:

```
## Assessment Feedback

### Strengths
- [List positive aspects]

### Areas for Improvement
- [List areas needing work]

### Technical Review
- Docker: [Comments]
- CI/CD: [Comments]
- Security: [Comments]
- Documentation: [Comments]

### Overall Grade: [X/100]

### Next Steps
- [Recommendations for improvement]
```

---

**Good luck with the assessment! 🎓**

