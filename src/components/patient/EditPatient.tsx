import { Button } from "../shared/Button";

interface EditPatientProps {
    setRightPanel: (panel: string) => void;
    patientid:string;
}

export const EditPatient: React.FC<EditPatientProps> = ({ setRightPanel,patientid }) => {
    const handleOnClose = () => {
        setRightPanel('view');
    }
    return (
        <div className=" bg-pink-100 text-black shadow-lg rounded-lg p-6 max-h-[88%] overflow-y-auto max-w-4xl">
            <div className=''>
                <div className='grid grid-cols-9 m-2'>

                    <h1 className="text-2xl font-semibold mb-6 text-center text-black md:col-span-8">Edit Patient</h1>
                    <Button variant="outline" onClick={handleOnClose} className='md:col-span-1 h-10'>Close</Button>
                </div>
            </div>
        </div>
    )
}