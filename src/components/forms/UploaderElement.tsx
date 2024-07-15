import { Box, Button, IconButton, Stack, TextField, TextFieldProps, Typography } from '@mui/material';
import {
  Control,
  FieldError,
  FieldPath,
  FieldValues,
  PathValue,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { useFormError } from './FormErrorProvider';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useTransform } from './useTransform';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFileOutlined';
import { utilsService } from "@utils/utilsService";

export type FileResultType = 'base64' | 'file' | 'none';
export type UploaderElementProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
> = Omit<TextFieldProps, 'name'> & {
  rules?: UseControllerProps<TFieldValues, TName>['rules'];
  name: TName;
  parseError?: (error: FieldError) => ReactNode;
  control?: Control<TFieldValues>;
  component?: typeof TextField;
  transform?: {
    input?: (value: PathValue<TFieldValues, TName>) => TValue;
    output?: (event: ChangeEvent<string | ArrayBuffer | File>) => PathValue<TFieldValues, TName>;
  };
  chooseLabel?: string;
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number;
  fileLimit?: number;
  resultType?: FileResultType;
  isUnknownImageUrl?: boolean;
  onRemove?: (value?: any) => any;
  invalidFileSizeMessage?: string;
  invalidFileTypeMessage?: string;
}

export const UploaderElement = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TValue = unknown,
>(
    props: UploaderElementProps<TFieldValues, TName, TValue>
) => {
  const {
    rules = {},
    parseError,
    name,
    control,
    transform,
    multiple,
    isUnknownImageUrl,
    accept,
    chooseLabel = 'انتخاب',
    maxFileSize,
    fileLimit = 3,
    resultType = 'base64',
    ...rest
  } = props;
  const filesToEmit = useRef<(string | ArrayBuffer | File)[]>([]);
  const [filesToShow, setFilesToShow] = useState<{
    display: string | ArrayBuffer,
    name: string,
    type: 'file' | 'image'
  }[]>([]);
  const [invalidFileSize, setInvalidFileSize] = useState(false);
  const [invalidFileType, setInvalidFileType] = useState(false);
  const hiddenFileInput = useRef(null);
  const errorMsgFn = useFormError();
  const customErrorFn = parseError || errorMsgFn;

  const {field, fieldState: {error}, formState} = useController({
    name,
    control,
    disabled: rest.disabled,
    rules,
  })

  useEffect(() => {
    init(formState.defaultValues[name]);
  }, [formState.defaultValues[name]]);

  const handleStringValue = async (item: string) => {
    const tempFilesToShow = [...filesToShow];
    tempFilesToShow.push({display: item, name: '--', type: getFileType(item)});
    setFilesToShow(tempFilesToShow);
    if (item.indexOf('base64') != -1) {
      if (resultType == 'base64') {
        filesToEmit.current.push(item);
      } else if (resultType == 'file') {
        const file = utilsService.base64toFile(item, item.split('/').pop());
        filesToEmit.current.push(file);
      } else {
        filesToEmit.current.push(item);
      }
    } else {
      const base64 = await utilsService.urlToBase64(item);
      if (resultType == 'base64') {
        filesToEmit.current.push(base64);
      } else if (resultType == 'file') {
        const file = utilsService.base64toFile(base64, item.split('/').pop())
        filesToEmit.current.push(file);
      } else {
        filesToEmit.current.push(item);
      }
    }
  }

  const init = async (defaultValue: any) => {
    if (!defaultValue) {
      return
    }
    setFilesToShow([]);
    filesToEmit.current = [];
    if (Array.isArray(defaultValue) && multiple) {
      for (const item of defaultValue) {
        if (item instanceof File) {
          await handleFile(item);
        }
        if (typeof item == 'string') {
          await handleStringValue(item);
        }
      }
      field.onChange(filesToEmit.current);
    } else if (defaultValue instanceof File) {
      await handleFile(defaultValue)
      field.onChange(filesToEmit.current[0]);
    } else if (typeof defaultValue == 'string') {
      await handleStringValue(defaultValue)
      field.onChange(filesToEmit.current[0]);
    }
  }

  const isValidFile = (file: File) => {
    if (accept && !utilsService.isFileTypeValid(file, accept)) {
      setInvalidFileType(true);
      return false;
    }
    if (maxFileSize && file.size > maxFileSize) {
      setInvalidFileSize(true);
      return false;
    }
    return true;
  }

  const _onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File = event.target.files[0];
    setInvalidFileType(false);
    setInvalidFileSize(false);
    if (!isValidFile(file)) {
      return;
    }
    if (multiple) {
      onMultipleSelect(file);
    } else if (!multiple) {
      onSingleSelect(file);
    }
  }

  const onSingleSelect = async (file: File) => {
    setFilesToShow([]);
    filesToEmit.current = [];
    await handleFile(file);
    field.onChange(filesToEmit.current[0]);
    rest.onChange?.(filesToEmit.current[0]);
  }

  const onSingleDelete = () => {
    filesToEmit.current = undefined;
    setFilesToShow([]);
    rest.onRemove?.();
    field.onChange(null);
  }

  const onMultipleSelect = async (file: File) => {
    if (filesToShow.findIndex(f => f.name == file.name) > -1) {
      return
    }
    await handleFile(file);
    field.onChange(filesToEmit.current);
    rest.onChange?.(filesToEmit.current);
  }

  const onMultipleDelete = (event: MouseEvent, index: number) => {
    event.stopPropagation();
    rest.onRemove?.(filesToEmit.current[index]);
    const files = [...filesToShow];
    files.splice(index, 1);
    setFilesToShow(files);
    filesToEmit.current.splice(index, 1);
    field.onChange(filesToEmit.current);
  }

  const handleFile = async (item: File) => {
    if (!item) {
      return
    }
    if (utilsService.isImage(item)) {
      const blobUrl = window.URL.createObjectURL(new Blob([item], {type: item.type}));
      setFilesToShow(prev => [...prev, {display: blobUrl, name: item.name, type: getFileType(item)}]);
    } else {
      setFilesToShow(prev => [...prev, {display: null, name: item.name, type: getFileType(item)}]);
    }
    if (resultType == 'base64') {
      const base64 = await utilsService.fileToBase64(item);
      filesToEmit.current.push(base64);
    } else if (resultType == 'file') {
      filesToEmit.current.push(item);
    } else {
      filesToEmit.current.push(item);
    }
  }

  const getFileType = (file: string | File) => {
    const isImage = !!file && ((typeof file == 'string' && file.includes('blob')) || isUnknownImageUrl || utilsService.isImage(file));
    if (isImage) {
      return 'image';
    } else {
      return 'file';
    }
  }

  const {onChange} = useTransform<TFieldValues, TName, TValue>({
    value: field.value,
    onChange: _onChange,
    transform: {
      input:
          typeof transform?.input === 'function'
              ? transform.input
              : (value) => {
                return value as TValue
              },
      output:
          typeof transform?.output === 'function'
              ? transform.output
              : (event: ChangeEvent<HTMLInputElement>) => {
                return event as PathValue<TFieldValues, TName>
              },
    },
  })

  return (
      <>
        <input
            {...rest}
            type="file"
            name={field.name}
            ref={hiddenFileInput}
            style={{display: 'none'}}
            onChange={onChange}
            onBlur={field.onBlur}
            required={!!rules.required}
        />
        {
          multiple ? (
              <Box sx={{display: 'flex', flexWrap: "wrap"}}>
                {
                    filesToShow.length < fileLimit &&
                    <Box sx={{
                      width: '120px',
                      height: '120px',
                      border: '1px dashed',
                      borderColor: 'secondary.dark',
                      borderRadius: '3px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      m: 0.5
                    }} onClick={() => hiddenFileInput.current.click()}>
                      <AttachFileIcon/>
                    </Box>
                }
                {
                  filesToShow.map((file, i) => (
                      <Box key={i} sx={{
                        width: '120px',
                        height: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        overflow: 'hidden',
                        outline: 'none',
                        transition: 'all 0.4s',
                        m: 0.5
                      }}>
                        {
                          file?.type === 'image' ? (
                                  <Box sx={{
                                    backgroundImage: 'url(' + (file?.display) + ')',
                                    height: '116px',
                                    backgroundColor: '#f5f5f5',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                  }}></Box>
                              ) :
                              <Box sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderColor: 'secondary.dark',
                              }}>
                                <FileIcon/>
                              </Box>
                        }
                        <Typography
                            sx={{
                              fontSize: '0.75rem',
                              position: 'absolute',
                              bottom: '0',
                              left: 0,
                              right: 0,
                              width: '100%',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              direction: 'rtl',
                              textOverflow: 'ellipsis',
                              backgroundColor: 'text.primary',
                              color: 'background.paper'
                            }}>
                          {file?.name}
                        </Typography>
                        <IconButton
                            onClick={(e) => onMultipleDelete(e, i)}
                            size="small"
                            color="error"
                            sx={{
                              backgroundColor: 'error.main',
                              color: '#fff',
                              position: 'absolute',
                              right: 'auto',
                              top: '0.25rem',
                              left: '0.25rem',
                              "&:hover": {
                                backgroundColor: 'error.main'
                              }
                            }}>
                          <DeleteIcon/>
                        </IconButton>
                      </Box>
                  ))
                }
              </Box>
          ) : (
              <Stack spacing={-0.5}>
                <Box sx={{
                  textAlign: 'center',
                  borderBottom: 0,
                  borderRadius: '4px 4px 0 0',
                  border: '1px solid',
                  borderColor: 'secondary.dark',
                  padding: filesToShow[0]?.type === 'image' ? '0.25rem' : '2rem',
                  position: 'relative'
                }}>
                  {
                      filesToShow.length != 0 && (
                          <IconButton
                              onClick={onSingleDelete}
                              size="small"
                              color="error"
                              sx={{
                                backgroundColor: 'error.main',
                                color: '#fff',
                                position: 'absolute',
                                right: 'auto',
                                top: '0.25rem',
                                left: '0.25rem',
                                "&:hover": {
                                  backgroundColor: 'error.main'
                                }
                              }}>
                            <DeleteIcon/>
                          </IconButton>
                      )
                  }
                  {
                    filesToShow[0]?.type === 'image' ? (
                        <Box sx={{
                          padding: 'clamp(50%, 100%, 50%) 0',
                          backgroundImage: 'url(' + (filesToShow[0]?.display) + ')',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                          backgroundSize: 'cover'
                        }}></Box>
                    ) : (
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <FileIcon/>
                        </Box>
                    )
                  }
                  <Typography
                      sx={{
                        fontSize: '0.75rem',
                        position: 'absolute',
                        bottom: '0',
                        left: 0,
                        right: 0,
                        width: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        direction: 'rtl',
                        textOverflow: 'ellipsis',
                        backgroundColor: 'text.primary',
                        color: 'background.paper'
                      }}>
                    {filesToShow[0]?.name}
                  </Typography>
                </Box>
                <Button fullWidth variant="outlined"
                        onClick={() => hiddenFileInput.current.click()}>{chooseLabel}</Button>
              </Stack>
          )
        }
        <div className={!!error ? 'error' : undefined}>
          {
              invalidFileSize && <>invalidFileSizeMessage</>
          }
          {
              invalidFileType && <>invalidFileTypeMessage</>
          }
          {
            error
                ? typeof customErrorFn === 'function'
                    ? customErrorFn(error)
                    : error.message
                : rest.helperText
          }
        </div>
      </>
  )
}
