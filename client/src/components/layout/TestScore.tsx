import Icon from "../../utils/Icon";

function TestScore() {
  return (
    <>
      <div>
        <span className="flex  items-center justify-center gap-1">
          <span className="inline-flex ">Performance:</span>
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
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
          <Icon title="star-icon" customStyle="inline-flex " icon="starEmpty" />
        </span>
        <span className="flex  scale-75 items-center justify-center gap-1 opacity-60">
          <span className="inline-flex ">Best:</span>
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

      <div className="-mt-3">
        <div className="flex  items-center justify-center gap-1">
          <span>Score:</span>
          <span className="inline-flex  text-[1.7rem]  text-yellow-600">
            1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-125 text-yellow-600"
            icon="trophy"
          />
        </div>
        <div className="flex  scale-75 items-center justify-center gap-1 opacity-60">
          <span>Best:</span>
          <span className="inline-flex  text-[1.7rem]  text-yellow-600">
            1,000
          </span>
          <Icon
            title="trophy-icon"
            customStyle="inline-flex  scale-125 text-yellow-600"
            icon="trophy"
          />
        </div>
      </div>
    </>
  );
}

export default TestScore;
