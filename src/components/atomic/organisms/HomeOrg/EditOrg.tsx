import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAddCategoryMutation, useGetCategoriesQuery } from "../../../../redux/services/categoriesService";
import { useAddBrandMutation, useGetBrandsQuery } from "../../../../redux/services/brandsService";
import { useEditProductMutation, useGetProductsInternalQuery } from "../../../../redux/services/productsService";
import { AddBrandModal, AddCategoryModal, EditProductForm, InternalProductCard } from "../../molecules";
import { Divider, Grid2 } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";
import { editProductSchema } from "../../../yup/editProductSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { toastOptions } from "../../../utils/toastOptions";
import { addCategoryData } from "../../../models/molecules/AddCategoryModal";
import { addCategorySchema } from "../../../yup/addCategorySchema";
import { addBrandSchema } from "../../../yup/addBrandSchema";

export const EditOrg = () => {
    /**
     * Parametro de ID del Producto a editar
     */
    const { idProducto } = useParams<{ idProducto: string }>();

    /**
     * Redux Services
     */
    const { data: categoriesDataSV, isLoading: isCategoriesDataLoading } = useGetCategoriesQuery(undefined);
    const { data: brandsDataSV, isLoading: isBrandsDataLoading } = useGetBrandsQuery(undefined);
    const { data: productDataSV, isLoading: isProductDataLoading } = useGetProductsInternalQuery(idProducto);
    const [editProductService, { isLoading: isEditProductLoading }] = useEditProductMutation(undefined);
    const [addCategoryService, { isLoading: isAddCategoryLoading }] = useAddCategoryMutation(undefined);
    const [addBrandService, { isLoading: isAddBrandLoading }] = useAddBrandMutation(undefined);


    /**
     * Estados
     */
    const [brandsData, setBrandsData] = useState([]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [isLoadingApp, setIsLoadingApp] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [productDataDB, setProductDataDB] = useState<typeof productDataSV>({});
    const [productData, setProductData] = useState({
        idProducto: 0,
        codigo: "",
        nombre: "",
        descripcion: "",
        categoria_idCategoria: 1,
        marca_idMarca: 1,
        isActive: false
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
     * React Hook Form de EDITAR PRODUCTO
     */
    const {
        handleSubmit: handleSubmitEditProduct,
        formState: { errors: errorsEditProduct },
        setValue: setValueEditProduct,
        trigger: triggerEditProduct
    } = useForm<{
        codigo: string;
        nombre: string;
        descripcion: string;
        categoria_idCategoria: number;
        marca_idMarca: number;
        isActive?: boolean;
    }>({
        resolver: yupResolver(editProductSchema),
    });

    /**
     * Seteo de data si el producto existe
     */
    useEffect(() => {
        if (productDataSV && productDataSV.data && productDataSV.data.length > 0) {
            const product = productDataSV.data[0];
            setProductDataDB(product);
            setProductData({
                idProducto: product.idProducto,
                codigo: product.codigo || "",
                nombre: product.nombre || "",
                descripcion: product.descripcion || "",
                categoria_idCategoria: 1,
                marca_idMarca: 1,
                isActive: false,
            });

            // Asegúrate de configurar los valores en React Hook Form
            setValueEditProduct("codigo", product.codigo || "");
            setValueEditProduct("nombre", product.nombre || "");
            setValueEditProduct("descripcion", product.descripcion || "");
            setValueEditProduct("categoria_idCategoria", 1);
            setValueEditProduct("marca_idMarca", 1);
            setValueEditProduct("isActive", false);
        }
    }, [productDataSV, setValueEditProduct]);

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
     * SETEO DE DATA ANTIGUA EN SELECTS
     */
    useEffect(() => {
        if (categoriesData && brandsData && categoriesData.length > 0 && brandsData.length > 0) {
            const categoryDB: any = categoriesData.filter((category: any) => {
                return (
                    category.label === productDataDB.categoria
                );
            });
            const brandDB: any = brandsData.filter((brand: any) => {
                return (
                    brand.label === productDataDB.marca
                );
            });
            if (categoryDB.length > 0 && brandDB.length > 0) {
                setProductData({
                    ...productData,
                    categoria_idCategoria: categoryDB[0].value || '',
                    marca_idMarca: brandDB[0].value || ''
                });
            }
        }
    }, [categoriesData, brandsData, productDataDB]);

    /**
     *  MANEJO DE MUTACIONES DE DATOS DE ESTADOS DEL FORMULARIO
     */
    type ProductWithoutIsActive = Exclude<keyof typeof productData, "isActive" | "idProducto">;
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name as ProductWithoutIsActive;
        setProductData({ ...productData, [e.target.name]: e.target.value });
        setProductDataDB({ ...productDataDB, [e.target.name]: e.target.value });
        setValueEditProduct(fieldName, e.target.value)
        triggerEditProduct(fieldName)
        if (e.target.name === "isActive") {
            const newIsActive = e.target.checked ? "Activo" : "Desactivado";
            setProductData({ ...productData, isActive: e.target.checked });
            setProductDataDB({ ...productDataDB, isActive: newIsActive });
        }
        if (e.target.name === "categoria_idCategoria") {
            const categorySelected: any = categoriesData.filter((category: any) => {
                const searchTerm = e.target.value;
                return (
                    category.value === searchTerm
                );
            });
            setProductDataDB({ ...productDataDB, categoria: categorySelected[0].label || productDataDB.categoria });
        }
        if (e.target.name === "marca_idMarca") {
            const brandSelected: any = brandsData.filter((brand: any) => {
                const searchTerm = e.target.value;
                return (
                    brand.value === searchTerm
                );
            });
            setProductDataDB({ ...productDataDB, marca: brandSelected[0].label || productDataDB.marca });
        }

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
    const editProductForm: SubmitHandler<{
        codigo: string;
        nombre: string;
        descripcion: string;
        categoria_idCategoria: number;
        marca_idMarca: number;
        isActive?: boolean;
    }> = async () => {
        const formData = new FormData();
        formData.append("jsonData", JSON.stringify(productData));
        if (productImage) {
            formData.append("image", productImage);
        }
        try {
            const response = await editProductService(formData).unwrap();
            setIsLoadingApp(true);
            if (response.error === false) {
                toast.success(response.message, toastOptions);
                setValueEditProduct("codigo", '');
                setValueEditProduct("nombre", '');
                setValueEditProduct("descripcion", '');
                setValueEditProduct("categoria_idCategoria", 1);
                setValueEditProduct("marca_idMarca", 1);
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
                {productDataSV?.data?.[0] ? (
                    <InternalProductCard
                        product={productDataDB}
                        isButtons={false}
                        isLoading={isLoadingApp}
                    />
                ) : (
                    <Grid2
                        size={{ xs: 12, sm: 12, md: 12 }}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "15px",
                        }}
                    >
                        <ThreeDots
                            visible={true}
                            height="25"
                            width="25"
                            color="#FFFFFF"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        />
                    </Grid2>
                )}
                <EditProductForm
                    productData={productData}
                    productDataDB={productDataDB}
                    brandsData={brandsData}
                    categoriesData={categoriesData}
                    isLoadingApp={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isEditProductLoading || isProductDataLoading || isAddCategoryLoading || isAddBrandLoading}
                    errors={errorsEditProduct}
                    handleFormChange={handleFormChange}
                    handleImageChange={handleImageChange}
                    handleSubmitEditProduct={handleSubmitEditProduct(editProductForm)}
                    clickAddButton1={openAddCategoryModal}
                    clickAddButton2={openAddBrandModal}
                    isButtonDisabled={isButtonDisabled}
                />
            </Grid2>
            <AddCategoryModal
                addCategory={addCategory}
                open={openAddCategory}
                handleClose={handleCloseAddCategoryModal}
                handleAddCategoryChange={handleAddCategoryChange}
                isLoading={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isEditProductLoading || isProductDataLoading || isAddCategoryLoading || isAddBrandLoading}
                addCategoryForm={handleSubmitAddCategory(addCategoryForm)}
                errorAddCategoryInputs={errorsAddCategory}
            />
            <AddBrandModal
                addBrand={addBrand}
                open={openAddBrand}
                handleClose={handleCloseAddBrandModal}
                handleAddBrandChange={handleAddBrandChange}
                isLoading={isLoadingApp || isCategoriesDataLoading || isBrandsDataLoading || isEditProductLoading || isProductDataLoading || isAddCategoryLoading || isAddBrandLoading}
                addBrandForm={handleSubmitAddBrand(addBrandForm)}
                errorAddBrandInputs={errorsAddBrand}
            />
        </>
    );
};
