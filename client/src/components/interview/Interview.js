export default function Interview({
  _id,
  interviewDate,
  interviewType,
  notes,
}) {
  return (
    <div>
      <p>{interviewDate}</p>
      <p>{interviewType}</p>
      <p>{notes}</p>
    </div>
  );
}
