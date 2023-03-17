const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  console.log(`assessments`, assessment);
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  await Assessment.create({
    catDateOfBirth: assessment.catDateOfBirth,
    catName: assessment.catName,
    createdAt: assessment.createdAt,
    deletedAt: assessment.deletedAt,
    id: assessment.id,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,
    updatedAt: assessment.updatedAt,
  });
};

exports.getList = () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = [];

  return assessments;
};
