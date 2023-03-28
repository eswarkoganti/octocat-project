import React from 'react';
import { useForm } from 'react-hook-form';
import '../../scss/NewAssessment.scss';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const initialData = {
    catDateOfBirth: ``,
    catName: ``,
    createdAt: new Date(),
    instrumentType: ``,
    riskLevel: ``,
    score: undefined,
    updatedAt: new Date(),

  };
  const { formState: { errors }, handleSubmit, register, reset } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const onSubmit = (data) => {
    const a = data.hissesAtStrangers === null ? 0 : parseInt(data.hissesAtStrangers);
    const b = data.physicalAltercationWithOtherCats === null ? 0 : parseInt(data.physicalAltercationWithOtherCats);
    const c = data.physicalAltercationsWithOwner === null ? 0 : parseInt(data.physicalAltercationsWithOwner);
    const d = data.playsWellWithDogs === null ? 0 : parseInt(data.playsWellWithDogs);
    const e = data.previousContactWithTheCatJudicial === null ? 0 : parseInt(data.previousContactWithTheCatJudicial);
    const sum = a + b + c + d + e;
    let riskLevel = ``;
    if (sum < 2) {
      riskLevel = `low`;
    } else if (sum >= 2 && sum <= 4) {
      riskLevel = `medium`;
    } else {
      riskLevel = `high`;
    }
    initialData.instrumentType = `instrument`;
    initialData.score = sum;
    initialData.riskLevel = riskLevel;
    initialData.catName = data.catName;
    initialData.catDateOfBirth = new Date(data.catDateOfBirth).toString();
    AssessmentService.submit(initialData);
    reset();
  };

  return (
    <div className="new-assessment">
      <form
        onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col">
            <label htmlFor="Cat Name">Cat Name</label>
            <div>
              <input
                id="Cat Name"
                type="text"
                placeholder="Cat Name"
                className="input"
                {...register(`catName`, { required: `Please enter cat name` })}
              />
              <p style={{ color: `red` }}>{errors.catName?.message}</p>
            </div>
          </div>
          <div className="col">
            <label htmlFor="Cat Date of Birth">Cat Date of Birth</label>
            <div>
              <input
                id="Cat Date of Birth"
                type="date"
                placeholder="Cat Date of Birth"
                className="input"
                {...register(`catDateOfBirth`, { required: `Please select cat date of birth` })}
              />
              <p style={{ color: `red` }}>{errors.catDateOfBirth?.message}</p>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="Previous contact with the Cat Judicial System">
              Previous contact with the Cat Judicial System
            </label>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`previousContactWithTheCatJudicial`)}
              />
              <label htmlFor="No" className="radio-label">No</label>
            </div>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`previousContactWithTheCatJudicial`)}
              />
              <label htmlFor="Yes" className="radio-label">Yes</label>
            </div>
          </div>
          {/* -------------------------------- */}
          <div className="col-md-6">
            <label htmlFor="Physical altercations with other cats">Physical altercations with other cats</label>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`physicalAltercationWithOtherCats`)}
              />
              <label htmlFor="0-3altercations" className="radio-label">0-3 altercations</label>
            </div>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`physicalAltercationWithOtherCats`)}
              />
              <label htmlFor="3+ altercations" className="radio-label">3+ altercations</label>
            </div>
          </div>
        </div>

        {/* -------------------------- */}
        <div className="row mt-3">
          <div className="col-md-6">
            <label htmlFor="Physical altercations with owner (scratching, biting, etc...)">
              Physical altercations with owner (scratching, biting, etc...)
            </label>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`physicalAltercationsWithOwner`)}
              />
              <label htmlFor="10+ altercations" className="radio-label">10+ altercations</label>
            </div>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`physicalAltercationsWithOwner`)}
              />
              <label htmlFor="0-10 altercations" className="radio-label">0-10 altercations</label>
            </div>
          </div>
          {/* ------------------ */}
          <div className="col-md-6">
            <label htmlFor="Plays well with dogs">Plays well with dogs</label>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`playsWellWithDogs`)}
              />
              <label htmlFor="No" className="radio-label">No</label>
            </div>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`playsWellWithDogs`)}
              />
              <label htmlFor="Yes" className="radio-label">Yes</label>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="Hisses at strangers">Hisses at strangers</label>
          <div>
            <input
              type="radio"
              value="1"
              {...register(`hissesAtStrangers`)}
            />
            <label htmlFor="Yes" className="radio-label">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              value="0"
              {...register(`hissesAtStrangers`)}
            />
            <label htmlFor="No" className="radio-label">No</label>
          </div>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
