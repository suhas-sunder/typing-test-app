import Icon from "../../utils/Icon";

function TestScore() {
  return (
    <div className="mb-2 flex w-full  scale-90 items-center justify-evenly">
      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-400 p-6 py-4 text-lg">
        <span className="flex  items-center justify-center gap-1 border-b-2 border-yellow-400 pb-2">
          <span className="inline-flex  text-yellow-600">Performance:</span>
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon title="star-icon" customStyle="inline-flex" icon="starEmpty" />
          <Icon title="star-icon" customStyle="inline-flex" icon="starEmpty" />
        </span>
        <span className="flex  scale-75 items-center justify-center gap-1 opacity-75">
          <span className="inline-flex text-yellow-600">Best:</span>
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex  text-yellow-600"
            icon="starFull"
          />
        </span>
      </div>

      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-400 p-6 py-4 text-lg">
        <div className="flex items-center justify-center gap-1 border-b-2 border-yellow-400 pb-2 text-yellow-600">
          <span>Score:</span>
          <span className="inline-flex  text-[1.2rem]  text-yellow-600">
            +1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-600"
            icon="trophy"
          />
        </div>
        <div className="flex scale-75 items-center justify-center gap-1 text-yellow-600 opacity-75">
          <span>Best:</span>
          <span className="inline-flex text-[1.1rem]  text-yellow-600">
            +1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-600"
            icon="trophy"
          />
        </div>
      </div>
    </div>
  );
}

export default TestScore;
