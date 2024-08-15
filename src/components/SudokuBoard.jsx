import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SudokuBoard = () => {
    const [puzzle, setPuzzle] = useState([]);
    const [difficulty, setDifficulty] = useState('medium');

    const fetchPuzzle = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/sudoku', {
                params: { level: difficulty }
            });
            console.log('Fetched puzzle:', response.data);  // Debugging: Log the fetched puzzle
            setPuzzle(response.data);
        } catch (error) {
            console.error('Error fetching the Sudoku puzzle:', error);
        }
    };

    useEffect(() => {
        fetchPuzzle();
    }, []);

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    return (
        <div>
            <h1>Sudoku Board</h1>
            <div>
                <label>
                    Select Difficulty:
                    <select value={difficulty} onChange={handleDifficultyChange}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <button onClick={fetchPuzzle}>Generate New Puzzle</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(9, 40px)', gap: '5px', marginTop: '20px' }}>
                {puzzle.flat().map((num, index) => (
                    <div key={index} style={{
                        width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                        backgroundColor: num === 0 ? '#f0f0f0' : '#fff', border: '1px solid #ccc', fontSize: '18px', color: '#000'  // Ensure the text color is black
                    }}>
                        {num !== 0 ? num : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SudokuBoard;
