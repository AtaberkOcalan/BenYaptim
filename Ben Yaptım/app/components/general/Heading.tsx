interface HeadingProps {
  center?: boolean;
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ center, text }) => {
  return (
    <div className={`flex h-16 ${center ? "justify-center items-center" : ""}`}>
      <div className="text-xl my-3 px-3 py-3">
        {text}
      </div>
    </div>
  );
}

export default Heading;
