import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { saveFlower, updateFlower } from "../../reducers/FlowerSlice.ts";
import { Flower } from "../../models/flower.ts";
import { toast } from "react-toastify";
import { AppDispatch } from "../../store/Store.ts";

interface RootState {
    flower: Flower[];
}

const FlowerFormComponent = forwardRef(({ onCloseModal }: { onCloseModal: () => void }, ref) => {
    const flowers = useSelector((store: RootState) => store.flower);
    const dispatch = useDispatch<AppDispatch>();

    const [flowerCode, setFlowerCode] = useState<number | "">(""); // Default as empty string
    const [flowerName, setFlowerName] = useState<string>("");
    const [previewFlowerImage, setPreviewFlowerImage] = useState<string | null>(null);
    const [flowerSize, setFlowerSize] = useState<string>("");
    const [flowerColour, setFlowerColour] = useState<string>("");
    const [flowerUnitPrice, setFlowerUnitPrice] = useState<number | "">(""); // Default as empty string
    const [flowerQtyOnHand, setFlowerQtyOnHand] = useState<number | "">(""); // Default as empty string

    const [editMode, setEditMode] = useState<boolean>(false);

    const fileInput1Ref = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        editFlower(flower: Flower) {
            setFlowerCode(flower.flower_code || "");
            setFlowerName(flower.flower_name || "");
            setFlowerColour(flower.flower_colour || "");
            setFlowerSize(flower.flower_size || "");
            setFlowerUnitPrice(flower.flower_unit_price || "");
            setFlowerQtyOnHand(flower.flower_qty_on_hand || "");
            setPreviewFlowerImage(flower.flower_image || null);
            setEditMode(true);
        },
    }));

    /*const handleFlowerOperation = async (type: "ADD_FLOWER" | "UPDATE_FLOWER") => {
        if (flowerCode === "" || flowerName === "" || flowerSize === "" || flowerColour === "" || flowerUnitPrice === "" || flowerQtyOnHand === "") {
            toast.error("Please fill out all required fields.", {
                position: "bottom-right",
                autoClose: 2000,
            });
            return;
        }

        const formData = new FormData();
        formData.append("flower_code", flowerCode.toString());
        formData.append("flower_name", flowerName);
        formData.append("flower_size", flowerSize);
        formData.append("flower_colour", flowerColour);
        formData.append("flower_unit_price", flowerUnitPrice.toString());
        formData.append("flower_qty_on_hand", flowerQtyOnHand.toString());

        if (fileInput1Ref.current?.files?.[0]) {
            formData.append("flower_image", fileInput1Ref.current.files[0]);
        }

        switch (type) {
            case "ADD_FLOWER":
                await dispatch(saveFlower(formData)).unwrap();
                toast.success("Flower saved successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                clearForm();
                onCloseModal();
                break;
            case "UPDATE_FLOWER":
                await dispatch(updateFlower(formData)).unwrap();
                toast.success("Flower updated successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                clearForm();
                setEditMode(false);
                onCloseModal();
                break;
            default:
                break;
        }
    };
*/
    /*const handleFlowerOperation = async (type: "ADD_FLOWER" | "UPDATE_FLOWER") => {
        if (flowerCode === "" || flowerName === "" || flowerSize === "" || flowerColour === "" || flowerUnitPrice === "" || flowerQtyOnHand === "") {
            toast.error("Please fill out all required fields.", {
                position: "bottom-right",
                autoClose: 2000,
            });
            return;
        }

        const formData = new FormData();
        formData.append("flower_code", flowerCode.toString());
        formData.append("flower_name", flowerName);
        formData.append("flower_size", flowerSize);
        formData.append("flower_colour", flowerColour);
        formData.append("flower_unit_price", flowerUnitPrice.toString());
        formData.append("flower_qty_on_hand", flowerQtyOnHand.toString());

        if (fileInput1Ref.current?.files?.[0]) {
            formData.append("flower_image", fileInput1Ref.current.files[0]);
        }

        switch (type) {
            case "ADD_FLOWER":
                await dispatch(saveFlower(formData)).unwrap();
                toast.success("Flower saved successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                clearForm();
                onCloseModal();
                break;
            case "UPDATE_FLOWER":
                await dispatch(updateFlower({ flowerCode, formData })).unwrap();
                toast.success("Flower updated successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                clearForm();
                setEditMode(false);
                onCloseModal();
                break;
            default:
                break;
        }
    };*/
    const handleFlowerOperation = async (type: "ADD_FLOWER" | "UPDATE_FLOWER") => {
        // Validate required fields (excluding flower_code for ADD_FLOWER)
        if (
            flowerName === "" ||
            flowerSize === "" ||
            flowerColour === "" ||
            flowerUnitPrice === "" ||
            flowerQtyOnHand === ""
        ) {
            toast.error("Please fill out all required fields.", {
                position: "bottom-right",
                autoClose: 2000,
            });
            return;
        }

        // Create FormData object
        const formData = new FormData();
        formData.append("flower_name", flowerName);
        formData.append("flower_size", flowerSize);
        formData.append("flower_colour", flowerColour);
        formData.append("flower_unit_price", flowerUnitPrice.toString());
        formData.append("flower_qty_on_hand", flowerQtyOnHand.toString());

        // Append image if available
        if (fileInput1Ref.current?.files?.[0]) {
            formData.append("flower_image", fileInput1Ref.current.files[0]);
        }

        try {
            switch (type) {
                case "ADD_FLOWER":
                    // For adding a flower, do not include flower_code
                    await dispatch(saveFlower(formData)).unwrap();
                    toast.success("Flower saved successfully!", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                    clearForm();
                    onCloseModal();
                    break;

                case "UPDATE_FLOWER":
                    // For updating a flower, include flower_code
                    if (flowerCode === "") {
                        toast.error("Flower code is required for updating.", {
                            position: "bottom-right",
                            autoClose: 2000,
                        });
                        return;
                    }
                    formData.append("flower_code", flowerCode.toString());
                    await dispatch(updateFlower({ flowerCode, formData })).unwrap();
                    toast.success("Flower updated successfully!", {
                        position: "bottom-right",
                        autoClose: 2000,
                    });
                    clearForm();
                    setEditMode(false);
                    onCloseModal();
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error("Error during flower operation:", error);
            toast.error("An error occurred. Please try again.", {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
        const flower = e.target.files?.[0];
        if (flower) {
            setPreview(URL.createObjectURL(flower));
        }
    };

    const clearForm = () => {
        setFlowerCode("");
        setFlowerName("");
        setFlowerSize("");
        setFlowerColour("");
        setFlowerUnitPrice("");
        setFlowerQtyOnHand("");
        setPreviewFlowerImage(null);
        setEditMode(false);

        if (fileInput1Ref.current) fileInput1Ref.current.value = "";
    };

    const handleSearchByFlowerCode = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const foundFlower = flowers.find((flower: Flower) => flower.flower_code === flowerCode);
            if (foundFlower) {
                setFlowerName(foundFlower.flower_name);
                setFlowerSize(foundFlower.flower_size);
                setFlowerColour(foundFlower.flower_colour);
                setFlowerUnitPrice(foundFlower.flower_unit_price);
                setFlowerQtyOnHand(foundFlower.flower_qty_on_hand);
                setPreviewFlowerImage(foundFlower.flower_image || null);
                setEditMode(true);
            } else {
                alert("Flower not found.");
            }
        }
    };

    return (
        <>
            <form
                className="mx-auto mt-0 p-3 rounded-lg border-2 border-[#432e32] shadow-lg bg-[#bda6a6]"
                style={{
                    width: "100%",
                    maxWidth: "600px",
                }}
            >
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="flower_code" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Code
                        </label>
                        <input
                            type="text"
                            id="flower_code"
                            value={flowerCode}
                            onChange={(e) => setFlowerCode(Number(e.target.value))}
                            onKeyDown={handleSearchByFlowerCode}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="01"
                            maxLength={5}
                        />
                    </div>
                    <div>
                        <label htmlFor="flower_name" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Name
                        </label>
                        <input
                            type="text"
                            id="flower_name"
                            value={flowerName}
                            onChange={(e) => setFlowerName(e.target.value)}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="Rose"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="flower_size" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Size
                        </label>
                        <input
                            type="text"
                            id="flower_size"
                            value={flowerSize}
                            onChange={(e) => setFlowerSize(e.target.value)}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="Large"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="flower_colour" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Colour
                        </label>
                        <input
                            type="text"
                            id="flower_colour"
                            value={flowerColour}
                            onChange={(e) => setFlowerColour(e.target.value)}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="Red"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="flower_unit_price" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Price
                        </label>
                        <input
                            type="number"
                            id="flower_unit_price"
                            value={flowerUnitPrice || ""}
                            onChange={(e) => setFlowerUnitPrice(Number(e.target.value))}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="10.00"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="flower_qty_on_hand" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Quantity in Hand
                        </label>
                        <input
                            type="number"
                            id="flower_qty_on_hand"
                            value={flowerQtyOnHand || ""}
                            onChange={(e) => setFlowerQtyOnHand(Number(e.target.value))}
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                            placeholder="100"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="flower_image" className="block mb-2 text-sm font-bold text-[#432e32]">
                            Image
                        </label>
                        <input
                            ref={fileInput1Ref}
                            type="file"
                            id="flower_image"
                            onChange={(e) => handleImageChange(e, setPreviewFlowerImage)}
                            accept="image/*"
                            className="w-full p-1 border border-[#432e32] rounded bg-gray-100 focus:outline-none shadow-md shadow-[#7e6868]"
                        />
                        {previewFlowerImage && (
                            <img
                                src={previewFlowerImage}
                                alt="Flower preview"
                                className="w-16 h-16 mt-2 rounded"
                            />
                        )}
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="w-[45%] py-2 px-3 text-sm font-medium text-white bg-[#007bff] rounded-md"
                        onClick={() => handleFlowerOperation(editMode ? "UPDATE_FLOWER" : "ADD_FLOWER")}
                    >
                        {editMode ? "Update Flower" : "Add Flower"}
                    </button>
                    <button
                        type="button"
                        className="w-[45%] py-2 px-3 text-sm font-medium text-white bg-[#dc3545] rounded-md"
                        onClick={clearForm}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </>
    );
});

export default FlowerFormComponent;