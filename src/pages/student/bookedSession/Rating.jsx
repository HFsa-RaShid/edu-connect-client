

const Rating = ({ value, onChange, isRequired }) => {
    const starClass = "text-4xl text-yellow-500 cursor-pointer"; 

    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={starClass}
                    onClick={() => onChange(index + 1)}
                >
                    {value > index ? '★' : '☆'}
                </span>
            ))}
        </div>
    );
};

export default Rating;
