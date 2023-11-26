import React, { useState, useEffect } from 'react';

const BirthdayComponent = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json'); // 파일 경로 확인
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); //const 안하니까 에러 발생
        setJsonData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleButtonClick = () => {
    if (!jsonData) return;
  
    const selectedPerson = jsonData.data.find(item => item.id === parseInt(input, 10));
  
    if (selectedPerson) {
      const { name, birth } = selectedPerson;
      const dateParts = birth.split('.'); // 날짜를 .을 기준으로 분리한다.
      const formattedBirth = `${dateParts[0]}년 ${dateParts[1]}월 ${dateParts[2]}일`;
      setOutput(`${name}의 생일은 ${formattedBirth} 입니다.`);
    } else {
      setOutput('존재하지 않음');
    }
  };
  

  return (
    <div>
      <p style={{ fontWeight: 'bold', fontSize: '2.0em' }}>생일 출력하기</p>
      {jsonData && jsonData.data ? (
  <div style={{ fontWeight: 'bold', fontSize: '1.6em' }}>
    {jsonData.data.map((item, index) => (
      <span key={item.id}>
        {`${item.id}. ${item.name}${index !== jsonData.data.length - 1 ? ', ' : ''}`}
      </span>
    ))}
  </div>
) : (
  <p>IsEmpty</p>
)} <p></p>
      <input type="text" value={input} onChange={handleInputChange} />
      <span> 번호를 출력하시오 </span>
      <button onClick={handleButtonClick}>출력</button>
      <p>{output}</p>
    </div>
  );
};

export default BirthdayComponent;
