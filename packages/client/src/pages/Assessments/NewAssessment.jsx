import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const initialData = {
    catDateOfBirth: ``,
    catName: ``,
    createdAt: new Date(),
    deletedAt: new Date(),
    id: 2,
    instrumentType: ``,
    riskLevel: ``,
    score: undefined,
    updatedAt: new Date(),

  };
  const { handleSubmit, register, reset } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  // const onSubmit = async (data) => {
  //   await AssessmentService.submit(data);
  // };
  const onSubmit = (data) => {
    const a = data.hissesAtStrangers === null ? 0 : parseInt(data.hissesAtStrangers);
    const b = data.physicalAltercationWithOtherCats === null ? 0 : parseInt(data.physicalAltercationWithOtherCats);
    const c = data.physicalAltercationsWithOwner === null ? 0 : parseInt(data.physicalAltercationsWithOwner);
    const d = data.playsWellWithDogs === null ? 0 : parseInt(data.playsWellWithDogs);
    const e = data.previousContactWithTheCatJudicial === null ? 0 : parseInt(data.previousContactWithTheCatJudicial);
    const sum = a + b + c + d + e;
    let riskLevel = ``;
    if (sum <= 2) {
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
    initialData.catDateOfBirth = data.catDateOfBirth;
    AssessmentService.submit(initialData);
    reset();
  };

  return (
    <div className="newAssessment">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-evenly">
        <div className="row">
          <div className="col-md-6">
            <label htmlFor="Cat Name">Cat Name</label>
            <input
              {...register(`catName`)}
              type="text"
              placeholder="Cat Name"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="Cat Date of Birth">Cat Date of Birth</label>
            <input
              type="date"
              placeholder="Cat Date of Birth"
              {...register(`catDateOfBirth`)}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="Previous contact with the Cat Judicia">Previous contact with the Cat Judicial System</label>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`previousContactWithTheCatJudicial`)}
              />
              <label htmlFor="No">No</label>
            </div>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`previousContactWithTheCatJudicial`)}
              />
              <label htmlFor="Yes">Yes</label>
            </div>
          </div>
          {/* -------------------------------- */}
          <div className="col-md-6">
            <label htmlFor="Physical altercations with other cats">Physical altercations with other cats</label>
            <div>
              <input
                type="radio"
                {...register(`physicalAltercationWithOtherCats`)}
                value="0"
              />
              <label htmlFor="0-3altercations">0-3 altercations</label>
            </div>
            <div>
              <input
                type="radio"
                {...register(`physicalAltercationWithOtherCats`)}
                value="1"
              />
              <label htmlFor="3+ altercations">3+ altercations</label>
            </div>
          </div>
        </div>

        {/* -------------------------- */}
        <div className="row mt-2">
          <div className="col-md-6">
            <label htmlFor="Physical altercations">Physical altercations with owner (scratching, biting, etc...)</label>
            <div>
              <input
                type="radio"
                {...register(`physicalAltercationsWithOwner`)}
                value="1"
              />
              <label htmlFor="10+ altercations">10+ altercations</label>
            </div>
            <div>
              <input
                type="radio"
                {...register(`physicalAltercationsWithOwner`)}
                value="0"
              />
              <label htmlFor="0-10 altercations">0-10 altercations</label>
            </div>
          </div>
          {/* ------------------ */}
          <div className="col-md-6 flex">
            <label htmlFor="Plays well with dogs" >Plays well with dogs</label>
            <div>
              <input
                type="radio"
                value="1"
                {...register(`playsWellWithDogs`)}
              />
              <label htmlFor="No">No</label>
            </div>
            <div>
              <input
                type="radio"
                value="0"
                {...register(`playsWellWithDogs`)}
              />
              <label htmlFor="No">Yes</label>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="Hisses at strangers">Hisses at strangers</label>
          <div>
            <input
              type="radio"
              value="1"
              {...register(`hissesAtStrangers`)}
            />
            <label htmlFor="Yes">Yes</label>
          </div>
          <div>
            <input
              type="radio"
              value="0"
              {...register(`hissesAtStrangers`)}
            />
            <label htmlFor="No">No</label>
          </div>
        </div>
        <button
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
