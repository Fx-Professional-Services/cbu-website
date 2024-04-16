const helloWorldHandler = async (req, res) => {
  res.status(200).json({ message: 'Hello World' });
};

export default helloWorldHandler;