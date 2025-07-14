interface buttonProps {
    text: string;
    onClickFunction?: (() => void) | ((arg: string)=>void);
}

const Button = ({text, onClickFunction}: buttonProps) =>{

    const handleClick = () => {
    if (onClickFunction) {
      onClickFunction(text);
      console.log(text);
    }
  };

    return <button className="w-auto p-3 h-12 rounded-xl hover:from-blue-600 hover:to-indigo-600 bg-gradient-to-r from-blue-700 to-indigo-700" onClick={handleClick}>
        {text}
    </button>
};

export default Button;