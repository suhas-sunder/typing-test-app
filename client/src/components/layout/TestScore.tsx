import Icon from "../../utils/Icon";

interface PropType {
  testScore: number;
}

function TestScore({ testScore }: PropType) {
  return (
    <div className="mb-2 flex w-full scale-90 flex-col items-center justify-evenly gap-10 sm:flex-row">
      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-800 border-opacity-40 p-6 py-4 text-lg">
        <span className="flex items-center justify-center gap-1 border-b-2 border-yellow-800 border-opacity-40 pb-2">
          <span className="inline-flex text-yellow-800 opacity-80">
            Performance:
          </span>
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-600"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800 opacity-40"
            icon="starEmpty"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800 opacity-40"
            icon="starEmpty"
          />
        </span>
        <span className="flex  scale-75 items-center justify-center gap-1 opacity-75">
          <span className="inline-flex text-yellow-800">Best:</span>
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800"
            icon="starFull"
          />
          <Icon
            title="star-icon"
            customStyle="inline-flex text-yellow-800"
            icon="starFull"
          />
        </span>
      </div>
      <div className="flex min-w-[17em] flex-col gap-2 rounded-md border-2 border-yellow-800 border-opacity-40 p-6 py-4 text-lg">
        <div className="flex items-center justify-center gap-2 border-b-2 border-yellow-800 border-opacity-40 pb-2 text-yellow-600">
          <span className="inline-flex text-yellow-800 opacity-80">Score:</span>
          <span className="inline-flex gap-2  text-[1.2rem]  text-yellow-600">
            + {testScore.toLocaleString()}
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-600"
            icon="trophy"
          />
        </div>
        <div className="flex scale-75 items-center justify-center gap-2 text-yellow-800 opacity-75">
          <span>Best:</span>
          <span className="inline-flex text-[1.1rem]  text-yellow-800">
            + 1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-105 text-yellow-800"
            icon="trophy"
          />
        </div>
      </div>
    </div>
  );
}

export default TestScore;
