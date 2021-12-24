import React from "react";

const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">
            {note.description} Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloremque rem aliquid obcaecati autem quam
            voluptates corporis ratione ad in accusantium rerum eligendi
            necessitatibus laborum saepe quasi ab adipisci reiciendis, ullam
            quidem nobis possimus quaerat. Illum officia aut doloremque,
            reprehenderit, ipsa vitae nobis delectus expedita quos facere
            voluptas possimus qui sit accusantium, rem maiores adipisci
            provident iusto tempora sunt dolore inventore nostrum architecto
            exercitationem? Nostrum, repellat natus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
