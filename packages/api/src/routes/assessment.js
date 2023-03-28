const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;
      await AssessmentService.submit(assessment);

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters

      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.get(
  `/list`,
  async (req, res, next) => {
    try {
      const assessments = await AssessmentService.getList();

      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js

      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.post(
  `/delete`,
  async (req, res, next) => {
    // console.log(`request---response`, req.body);
    try {
      await AssessmentService.deleteAssessment(req.body.id);
      ResponseHandler(
        res,
        `Assessment deleted`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
