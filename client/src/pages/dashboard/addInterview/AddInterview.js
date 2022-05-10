import { useAppContext } from '../../../context/AppContext';

import FormRow from '../../../components/formRow/FormRow';
import FormRowSelect from '../../../components/formRowSelect/FormRowSelect';

export default function AddInterview() {
  const {
    interviewDate,
    interviewType,
    interviewTypeOptions,
    notes,
    handleChange,
    addInterview,
    clearValues,
    company,
    position,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    addInterview();
    clearValues();
  };
  const handleInterviewInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Interview</h3>
      <p>Company: {company}</p>
      <p>Position: {position}</p>
      <FormRow
        label="Interview Date"
        name="interviewDate"
        type="date"
        value={interviewDate}
        handleChange={handleInterviewInput}
      />
      <FormRowSelect
        labelName="Interview Type"
        name="interviewType"
        value={interviewType}
        list={interviewTypeOptions}
        handleChange={handleInterviewInput}
      />
      <FormRow
        label="Notes"
        name="notes"
        value={notes}
        type="textarea"
        handleChange={handleInterviewInput}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
