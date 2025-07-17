interface buttonProps {
    text: string;
    onClickFunction?: (() => void) | ((arg: string)=>void);
    className?: string;
}

const Button = ({text, onClickFunction,className}: buttonProps) =>{

    const handleClick = () => {
    if (onClickFunction) {
      onClickFunction(text);
    }
  };

    return <button className={`${className ?? ''} w-auto p-3 h-12 rounded-xl hover:from-blue-600 hover:to-indigo-600 bg-gradient-to-r from-blue-700 to-indigo-700 `} onClick={handleClick}>
        {text}
    </button>
};

export default Button;