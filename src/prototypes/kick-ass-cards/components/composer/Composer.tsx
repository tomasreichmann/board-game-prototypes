enum ComposedContentTypeEnum {
    "Text" = "Text",
    "List" = "List",
    "Image" = "Image",
}

type ComposedContentDefinitionType = {
    type: ComposedContentTypeEnum;
    propsSchema: any;
};

type ComposedContentType = {
    type: ComposedContentTypeEnum;
    props: any;
};
