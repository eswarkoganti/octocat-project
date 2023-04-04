import React from 'react';
import '../../scss/NewAssessment.scss';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const initialData = {
    catDateOfBirth: Date,
    catName: ``,
    createdAt: new Date(),
    instrumentType: ``,
    riskLevel: ``,
    score: undefined,
    updatedAt: new Date(),

  };
  const { control, formState: { errors }, handleSubmit, register, reset } = useForm();

  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API

  const onSubmit = (data) => {
    const a = data.hissesAtStrangers === undefined ? 0 : parseInt(data.hissesAtStrangers);
    const b = data.physicalAltercationWithOtherCats === undefined ?
      0 : parseInt(data.physicalAltercationWithOtherCats);
    const c = data.physicalAltercationsWithOwner === undefined ?
      0 : parseInt(data.physicalAltercationsWithOwner);
    const d = data.playsWellWithDogs === undefined ? 0 : parseInt(data.playsWellWithDogs);
    const e = data.previousContactWithTheCatJudicial === undefined ?
      0 : parseInt(data.previousContactWithTheCatJudicial);
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
    initialData.catDateOfBirth = new Date(data.catDateOfBirth);
    AssessmentService.submit(initialData);
    reset();
  };

  return (
    <div className="assessment-form">
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group className="mb-2">
          <Form.Label>Cat Name</Form.Label>
          <Controller control={control} name="catName" defaultValue=""
            render={({ field: { onChange, ref, value } }) =>
              <Form.Control onChange={onChange} value={value} ref={ref} placeholder="Enter Cat Name"
                {...register(`catName`, { required: `Please Enter Cat Name` })} />} />
          <Form.Control.Feedback type="required" style={{ color: `red` }}>
            {errors.catName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Cat Date of Birth</Form.Label>
          <Controller control={control} name="catDateOfBirth" defaultValue="" className="date-input"
            render={({ field: { onChange, ref, value } }) =>
              <Form.Control onChange={onChange} value={value} ref={ref} type="date"
                placeholder="Enter Cat Date of Birth"
                {...register(`catDateOfBirth`, { required: `Please Select Cat Date of Birth` })}
              />} />
          <Form.Control.Feedback type="required" style={{ color: `red` }}>
            {errors.catDateOfBirth?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="row mb-2">
          <div className="col-6">
            <Form.Group>
              <Form.Label>Previous contact with the Cat Judicial System</Form.Label>
              <Controller control={control} name="previousContactWithTheCatJudicial"
                render={({ field: { onChange, ref } }) =>
                  <>
                    <Form.Check onChange={onChange} value="0" ref={ref} label="No" type="radio"
                    />
                    <Form.Check onChange={onChange} value="1" ref={ref} label="Yes" type="radio"
                    />
                  </>} />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group>
              <Form.Label>Physical altercations with other cats</Form.Label>
              <Controller control={control} name="physicalAltercationWithOtherCats"
                render={({ field: { onChange, ref } }) =>
                  <>
                    <Form.Check onChange={onChange} value="0" ref={ref} label="0-3 altercations" type="radio"
                    />
                    <Form.Check onChange={onChange} value="1" ref={ref} label="3+ altercations" type="radio"
                    />
                  </>} />
            </Form.Group>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-6">
            <Form.Group>
              <Form.Label>Physical altercations with owner (scratching, biting, etc...)</Form.Label>
              <Controller control={control} name="physicalAltercationsWithOwner"
                render={({ field: { onChange, ref } }) =>
                  <>
                    <Form.Check onChange={onChange} value="1" ref={ref} label="10+ altercations" type="radio"
                    />
                    <Form.Check onChange={onChange} value="2" ref={ref} label="0-10 altercations" type="radio"
                    />
                  </>} />
            </Form.Group>
          </div>
          <div className="col-6">
            <Form.Group>
              <Form.Label>Plays well with dogs</Form.Label>
              <Controller control={control} name="playsWellWithDogs"
                render={({ field: { onChange, ref } }) =>
                  <>
                    <Form.Check onChange={onChange} value="1" ref={ref} label="No" type="radio"
                    />
                    <Form.Check onChange={onChange} value="0" ref={ref} label="Yes" type="radio"
                    />
                  </>} />
            </Form.Group>
          </div>
        </div>
        <Form.Group className="mb-2">
          <Form.Label>Hisses at strangers</Form.Label>
          <Controller control={control} name="hissesAtStrangers"
            render={({ field: { onChange, ref } }) =>
              <>
                <Form.Check onChange={onChange} value="1" ref={ref} label="Yes" type="radio"
                />
                <Form.Check onChange={onChange} value="0" ref={ref} label="No" type="radio"
                />
              </>} />
        </Form.Group>

        <Button type="submit"
          className="btn btn-primary">
          Save
        </Button>
      </Form>
    </div>
  );
};
