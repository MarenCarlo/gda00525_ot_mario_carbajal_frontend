import { Box, Button, Grid2, Divider, styled, FormControlLabel, Switch } from "@mui/material";
import { TextInput, SelectInputButton, AppButton } from "../../atoms";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { EditProductFormProps } from "../../../models/molecules/EditProductForm";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const EditProductForm: React.FC<EditProductFormProps> = ({
    productData,
    productDataDB,
    brandsData,
    categoriesData,
    isLoadingApp,
    errors,
    handleFormChange,
    handleImageChange,
    handleSubmitEditProduct,
    clickAddButton1,
    clickAddButton2,
    isButtonDisabled,
    isAddingProduct = false
}) => {
    return (
        <Box
            component="form"
            onSubmit={handleSubmitEditProduct}
            autoComplete="off"
            sx={{
                display: "contents",
            }}
        >
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                <TextInput
                    id="codigo"
                    label="SKU Producto"
                    type="text"
                    name="codigo"
                    value={productData.codigo}
                    onChange={handleFormChange}
                    sx={{ width: "100%" }}
                    disabled={isLoadingApp}
                    error={!!errors.codigo}
                    helperText={errors.codigo?.message}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                <TextInput
                    id="nombre"
                    label="Nombre Producto"
                    type="text"
                    name="nombre"
                    value={productData.nombre}
                    onChange={handleFormChange}
                    sx={{ width: "100%" }}
                    disabled={isLoadingApp}
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <TextInput
                    id="descripcion"
                    label="Breve Descripción"
                    type="text"
                    name="descripcion"
                    value={productData.descripcion}
                    onChange={handleFormChange}
                    sx={{ width: "100%" }}
                    disabled={isLoadingApp}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion?.message}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <SelectInputButton
                    id={'marca_idMarca'}
                    label={'Seleccione Marca'}
                    name={'marca_idMarca'}
                    value={productData.marca_idMarca}
                    options={brandsData}
                    onChange={handleFormChange}
                    isLoading={isLoadingApp}
                    sx={{ maxWidth: '500px' }}
                    error={!!errors.marca_idMarca}
                    helperText={errors.marca_idMarca?.message}
                    clickAddButton={clickAddButton2}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 6 }} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                <SelectInputButton
                    id={'categoria_idCategoria'}
                    label={'Seleccione Categoría'}
                    name={'categoria_idCategoria'}
                    value={productData.categoria_idCategoria}
                    options={categoriesData}
                    onChange={handleFormChange}
                    isLoading={isLoadingApp}
                    sx={{ maxWidth: '500px' }}
                    error={!!errors.categoria_idCategoria}
                    helperText={errors.categoria_idCategoria?.message}
                    clickAddButton={clickAddButton1}
                />
            </Grid2>
            {
                isAddingProduct ?
                    <></>
                    :
                    <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '15px',
                    }}>
                        <Box
                            sx={{
                                bgcolor: '#0F0F0F',
                                borderRadius: "30px",
                                alignContent: "center",
                                paddingX: "50px",
                            }}
                        >
                            <FormControlLabel
                                sx={{
                                    color: "#FFFFFF",
                                    width: "150px"
                                }}
                                control={
                                    <Switch
                                        name="isActive"
                                        id="isActive"
                                        color="info"
                                        checked={productDataDB?.isActive === "Activo"}
                                        value={productData.isActive}
                                        onChange={handleFormChange}
                                    />
                                }
                                label={productDataDB?.isActive === "Activo" ? "Producto Activo" : "Producto Inactivo"}
                                labelPlacement="bottom"
                            />
                        </Box>
                    </Grid2>
            }

            <Grid2 size={{ xs: 12, sm: 12, md: 12 }}>
                <Divider sx={{ bgcolor: "#444444" }} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    size="large"
                    sx={{ color: "#FFFFFF" }}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    {
                        isAddingProduct ? "Agregar Imagen del Producto" : "Cambiar Imagen del Producto"
                    }
                    <VisuallyHiddenInput
                        type="file"
                        onChange={handleImageChange}
                        multiple
                    />
                </Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} sx={{ marginBottom: '15px' }}>
                <Divider sx={{ bgcolor: "#444444" }} />
            </Grid2>
            <Grid2
                size={{ xs: 12, sm: 12, md: 12 }}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <AppButton
                    variant="contained"
                    type="submit"
                    color="primary"
                    sx={{ maxWidth: "500px", width: "100%", paddingY: "12px" }}
                    isLoading={isLoadingApp || isButtonDisabled}
                >
                    Guardar Cambios
                </AppButton>
            </Grid2>
        </Box>
    );
};