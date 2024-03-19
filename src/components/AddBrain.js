import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { FileUploader } from 'react-drag-drop-files';

export default function AddBrain(props) {

    const [brainName, setBrainName] = useState('');
    const [brainDescription, setBrainDescription] = useState('');

    const baseUrl = document.URL;


    const { brainId } = props;

    /* ========== START OF MODAL TOGGLE LOGIC ========== */

    const [show, setShow] = useState(props.show);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /* ========== END OF MODAL TOGGLE LOGIC ========== */





    /* ========== START OF SUBMIT LOGIC ========== */

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append('name', brainName);
        formData.append('description', brainDescription);
        files.forEach((file) => {
            formData.append('files', file);
        });

        props.newBrain(formData);

        // reset state after submission
        setBrainName('');
        setBrainDescription('');
        setFiles([]);
    
    };

    /* ========== END OF SUBMIT LOGIC ========== */





    /* ========== START OF NEW FILE LOGIC ========== */

    const fileTypes = ["JPEG", "PNG", "GIF", "PPTX", "PDF"];
    const [files, setFiles] = useState([]);

    const handleChange = (newFiles) => {
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    const handleDelete = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // Permanent state for files to be displayed
    const [fileArray, setFileArray] = useState([]);


    // Effect to log fileArray whenever it changes
    useEffect(() => {
        console.log("Current files in the array:", files);
        console.log('brain:', );
    }, [files]); // Dependency array includes fileArray

     /* ========== END OF NEW FILE LOGIC ========== */

    return (
        <>
            <div className="w-[250px] max-w-sm bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-30 border-dashed border-2 border-gray-400 rounded-lg shadow-xl shadow-blue-gray-900/4 dark:bg-gray-800 dark:border-gray-700 m-2">
                <div className="flex flex-col items-center pb-4 px-4 pt-4">
                    <div className="flex mt-7 md:mt-16">
                        {props.editBrain}
                        <button
                            onClick={props.toggleShow}
                            className="block mx-auto m-2 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            + Add Brain
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                size='xl'
                show={props.show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Brain</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form
                        id='edit-brain'
                        className="w-full max-w-lg"
                        onSubmit={handleSubmit}
                    >
                        {/* Brain Name */}
                        <div className="flex flex-wrap -mx-3 mb-1">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                    Brain Name
                                </label>
                                <p className="text-gray-600 text-xs italic">REQUIRED</p>
                                <input className="appearance-none h-10 block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="brain-name"
                                    value={brainName}
                                    onChange={(e) => {
                                        setBrainName(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Brain Name"
                                />
                            </div>

                        </div>
                        {/* Brain Description */}
                        <div className="flex flex-wrap -mx-3 mb-1">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Description
                                </label>
                                <p className="text-gray-600 text-xs italic">REQUIRED</p>
                                <input
                                    rows='4'
                                    className="appearance-none h-10 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="brain-description"
                                    value={brainDescription}
                                    onChange={(e) => {
                                        setBrainDescription(e.target.value)
                                    }}
                                    type="text"
                                    placeholder="Brain Description"
                                />
                            </div>
                        </div>
                        {/* Uploaded Files*/}
                        <div className="flex flex-wrap -mx-3 mb-1">
                            {/* new files package */}
                            <div className='w-full px-3 flex flex-col'>
                                <FileUploader
                                    multiple={true}
                                    handleChange={handleChange}
                                    name='files'
                                    types={fileTypes}
                                />
                                {/* Display all uploaded file names */}
                                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>Uploaded Files</label>
                                {files.length > 0 ? (
                                <>
                                    <ul className='space-y-2'>
                                        {files.map((file, index) => (
                                            <li key={index}>
                                                {file.name}
                                                {/* Delete button next to each file name */}
                                                <button onClick={() => handleDelete(index)} className="ml-4 text-red-500 hover:text-red-700">
                                                    Delete
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                                ) : (
                                    <h4>No files uploaded yet</h4>
                                )}
                            </div>
                        </div>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.toggleShow} className='py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                        Cancel
                    </button>
                    <button
                        form='edit-brain'
                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

                    >
                        Add Brain
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}