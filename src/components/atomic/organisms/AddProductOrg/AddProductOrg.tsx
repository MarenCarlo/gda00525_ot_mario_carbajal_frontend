import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../../../../redux/services/categoriesService";
import { useAddBrandMutation, useGetBrandsQuery } from "../../../../redux/services/brandsService";
import { useAddProductsMutation } from "../../../../redux/services/productsService";
import { AddBrandModal, AddCategoryModal, EditProductForm } from "../../molecules";
import { Grid2 } from "@mui/material";
import { editProductSchema } from "../../../yup/editProductSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/toastOptions";
import { addCategoryData } from "../../../models/molecules/AddCategoryModal";
import { addCategorySchema } from "../../../yup/addCategorySchema";
import { addBrandSchema } from "../../../yup/addBrandSchema";

export const AddProductOrg = () => {
    const navigate = useNavigate();

    /**
     * Redux Services
     */
    const { data: categoriesDataSV, isLoading: isCategoriesDataLoading } = useGetCategoriesQuery(undefined);
    const { data: brandsDataSV, isLoading: isBrandsDataLoading } = useGetBrandsQuery(undefined);
    const [addCategoryService, { isLoading: isAddCategoryLoading }] = useAddCategoryMutation(undefined);
    const [addBrandService, { isLoading: isAddBrandLoading }] = useAddBrandMutation(undefined);
    const [addProductService, { isLoading: isAddProductLoading }] = useAddProductsMutation(undefined);

    /**
     * Estados
     */
    const [brandsData, setBrandsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [productData, setProductData] = useState({
        codigo: "",
        nombre: "",
        descripcion: "",
        categoria_idCategoria: "",
        marca_idMarca: ""
    });
    const [productImage, setProductImage] = useState<File | null>(null);
    const [addCategory, setAddCategory] = useState<addCategoryData>({
        nombre: '',
        descripcion: ''
    });
    const [addBrand, setAddBrand] = useState<addCategoryData>({
        nombre: '',
        descripcion: ''
    });
    const [openAddCategory, setOpenAddCategory] = useState(false);
    const [openAddBrand, setOpenAddBrand] = useState(false);

    /**
     * Closers de Modals
     */
    //Category Modal
    const handleCloseAddCategoryModal = () => {
        setOpenAddCategory(false);
        setAddBrand({
            nombre: '',
            descripcion: ''
        })
    };
    const openAddCategoryModal = () => {
        setOpenAddCategory(true);
    }
    //Brand Modal
    const handleCloseAddBrandModal = () => {
        setOpenAddBrand(false);
        setAddCategory({
            nombre: '',
            descripcion: ''
        })
    };
    const openAddBrandModal = () => {
        setOpenAddBrand(true);
    }

    /**
     * Handle Change Modal category
     */
    const handleAddCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof typeof addCategory;
        setAddCategory({ ...addCategory, [e.target.name]: e.target.value });
        setValueAddCategory(fieldName, e.target.value);
        triggerAddCategory(fieldName);
    };
    /**
     * Handle Change Modal Brand
     */
    const handleAddBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as keyof typeof addBrand;
        setAddBrand({ ...addBrand, [e.target.name]: e.target.value });
        setValueAddBrand(fieldName, e.target.value);
        triggerAddBrand(fieldName);
    };

    /**
     * React Hook Form de ADD CATEGORY
     */
    const {
        handleSubmit: handleSubmitAddCategory,
        formState: { errors: errorsAddCategory },
        setValue: setValueAddCategory,
        trigger: triggerAddCategory
    } = useForm<{
        nombre: string;
        descripcion: string;
    }>({
        resolver: yupResolver(addCategorySchema),
    });

    /**
     * React Hook Form de ADD BRAND
     */
    const {
        handleSubmit: handleSubmitAddBrand,
        formState: { errors: errorsAddBrand },
        setValue: setValueAddBrand,
        trigger: triggerAddBrand
    } = useForm<{
        nombre: string;
        descripcion: string;
    }>({
        resolver: yupResolver(addBrandSchema),
    });

    /**
     * React Hook Form de AGREGAR PRODUCTO
     */
    const {
        handleSubmit: handleSubmitAddProduct,
        formState: { errors: errorsAddProduct },
        setValue: setValueAddProduct,
        trigger: triggerAddProduct
    } = useForm<{
        codigo: string;
        nombre: string;
        descripcion: string;
        categoria_idCategoria: number;
        marca_idMarca: number;
    }>({
        resolver: yupResolver(editProductSchema),
    });

    /**
     * SETEO DE DATA DE SELECTS categories
     */
    useEffect(() => {
        if (categoriesDataSV?.data) {
            const categoriesOptions = categoriesDataSV.data.map((category: any) => ({
                value: category.idCategoriaProducto,
                label: category.nombre,
            }));
            setCategoriesData(categoriesOptions);
        }
    }, [categoriesDataSV]);

    /**
     * SETEO DE DATA DE SELECTS brands
     */
    useEffect(() => {
        if (brandsDataSV?.data) {
            const brandsOptions = brandsDataSV.data.map((brand: any) => ({
                value: brand.idMarcaProducto,
                label: brand.nombre,
            }));
            setBrandsData(brandsOptions);
        }
    }, [brandsDataSV]);

    /**
     *  MANEJO DE MUTACIONES DE DATOS DE ESTADOS DEL FORMULARIO
     */
    type ProductWithoutIsActive = Exclude<keyof typeof productData, "isActive" | "idProducto">;
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as ProductWithoutIsActive;
        setProductData({ ...productData, [e.target.name]: e.target.value });
        setValueAddProduct(fieldName, e.target.value);
        triggerAddProduct(fieldName);
    };

    /**
     * MANEJO DE SELECCION DE IMAGEN DEL FORMULARIO
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setProductImage(file);
        }
    };

    /**
     * Manejo de Submit form de Editar Producto DATA
      */
    const addProductForm: SubmitHandler<{
        codigo: string;
        nombre: string;
        descripcion: string;
        categoria_idCategoria: number;
        marca_idMarca: number;
    }> = async () => {
        const formData = new FormData();
        formData.append("jsonData", JSON.stringify(productData));
        if (productImage) {
            formData.append("image", productImage);
        }
        try {
            const response = await addProductService(formData).unwrap();
            setIsLoadingApp(true);
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setProductData({
                    codigo: "",
                    nombre: "",
                    descripcion: "",
                    categoria_idCategoria: "",
                    marca_idMarca: ""
                })
                setValueAddProduct("codigo", '');
                setValueAddProduct("nombre", '');
                setValueAddProduct("descripcion", '');
                setValueAddProduct("categoria_idCategoria", 0);
                setValueAddProduct("marca_idMarca", 0);
                navigate("/Home", { replace: true });
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };

    /**
     * Manejo de Submit form de ADD CATEGORY
     */
    const addCategoryForm: SubmitHandler<{
        nombre: string;
        descripcion: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            handleCloseAddCategoryModal();
            const newCategoryData = {
                nombre: data.nombre,
                descripcion: data.descripcion
            };
            const response = await addCategoryService(newCategoryData).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setAddCategory({
                    nombre: '',
                    descripcion: ''
                })
                setValueAddCategory("nombre", '');
                setValueAddCategory("descripcion", '');
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };

    /**
     * Manejo de Submit form de ADD BRAND
     */
    const addBrandForm: SubmitHandler<{
        nombre: string;
        descripcion: string;
    }> = async (data) => {
        try {
            setIsLoadingApp(true);
            handleCloseAddBrandModal();
            const newBrandData = {
                nombre: data.nombre,
                descripcion: data.descripcion
            };
            const response = await addBrandService(newBrandData).unwrap();
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setAddBrand({
                    nombre: '',
                    descripcion: ''
                })
                setValueAddCategory("nombre", '');
                setValueAddCategory("descripcion", '');
            }
        } catch (error: any) {
            toast.error(error.data.message, toastOptions);
            console.error("Error: ", error.data.message);
        } finally {
            setIsLoadingApp(false);
        }
    };
    return (
        <>
            <Grid2 container spacing={{ xs: 2, md: 2 }} columns={{ xs: 12, sm: 12, md: 12 }} sx={{ marginY: "25px" }}>
                <EditProductForm
                    productData={productData}
                    brandsData={brandsData}
                    categoriesData={categoriesData}
                    isLoadingApp={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isAddCategoryLoading || isAddBrandLoading || isAddProductLoading}
                    errors={errorsAddProduct}
                    handleFormChange={handleFormChange}
                    handleImageChange={handleImageChange}
                    handleSubmitEditProduct={handleSubmitAddProduct(addProductForm)}
                    clickAddButton1={openAddCategoryModal}
                    clickAddButton2={openAddBrandModal}
                    isButtonDisabled={isButtonDisabled}
                    isAddingProduct={true}
                />
            </Grid2>
            <AddCategoryModal
                addCategory={addCategory}
                open={openAddCategory}
                handleClose={handleCloseAddCategoryModal}
                handleAddCategoryChange={handleAddCategoryChange}
                isLoading={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isAddCategoryLoading || isAddBrandLoading || isAddProductLoading}
                addCategoryForm={handleSubmitAddCategory(addCategoryForm)}
                errorAddCategoryInputs={errorsAddCategory}
            />
            <AddBrandModal
                addBrand={addBrand}
                open={openAddBrand}
                handleClose={handleCloseAddBrandModal}
                handleAddBrandChange={handleAddBrandChange}
                isLoading={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isAddCategoryLoading || isAddBrandLoading || isAddProductLoading}
                addBrandForm={handleSubmitAddBrand(addBrandForm)}
                errorAddBrandInputs={errorsAddBrand}
            />
        </>
    )
}