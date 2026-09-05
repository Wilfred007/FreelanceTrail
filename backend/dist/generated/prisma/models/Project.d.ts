import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectPayload>;
export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type ProjectAvgAggregateOutputType = {
    onchainId: number | null;
};
export type ProjectSumAggregateOutputType = {
    onchainId: bigint | null;
};
export type ProjectMinAggregateOutputType = {
    id: string | null;
    onchainId: bigint | null;
    status: $Enums.ProjectStatus | null;
    metadataURI: string | null;
    title: string | null;
    description: string | null;
    clientId: string | null;
    developerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProjectMaxAggregateOutputType = {
    id: string | null;
    onchainId: bigint | null;
    status: $Enums.ProjectStatus | null;
    metadataURI: string | null;
    title: string | null;
    description: string | null;
    clientId: string | null;
    developerId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProjectCountAggregateOutputType = {
    id: number;
    onchainId: number;
    status: number;
    metadataURI: number;
    title: number;
    description: number;
    clientId: number;
    developerId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProjectAvgAggregateInputType = {
    onchainId?: true;
};
export type ProjectSumAggregateInputType = {
    onchainId?: true;
};
export type ProjectMinAggregateInputType = {
    id?: true;
    onchainId?: true;
    status?: true;
    metadataURI?: true;
    title?: true;
    description?: true;
    clientId?: true;
    developerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProjectMaxAggregateInputType = {
    id?: true;
    onchainId?: true;
    status?: true;
    metadataURI?: true;
    title?: true;
    description?: true;
    clientId?: true;
    developerId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProjectCountAggregateInputType = {
    id?: true;
    onchainId?: true;
    status?: true;
    metadataURI?: true;
    title?: true;
    description?: true;
    clientId?: true;
    developerId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectCountAggregateInputType;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject[P]> : Prisma.GetScalarType<T[P], AggregateProject[P]>;
};
export type ProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput | Prisma.ProjectOrderByWithAggregationInput[];
    by: Prisma.ProjectScalarFieldEnum[] | Prisma.ProjectScalarFieldEnum;
    having?: Prisma.ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type ProjectGroupByOutputType = {
    id: string;
    onchainId: bigint | null;
    status: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description: string | null;
    clientId: string;
    developerId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]>;
}>>;
export type ProjectWhereInput = {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    onchainId?: Prisma.BigIntNullableFilter<"Project"> | bigint | number | null;
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFilter<"Project"> | string;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    clientId?: Prisma.StringFilter<"Project"> | string;
    developerId?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    client?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    developer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    milestones?: Prisma.MilestoneListRelationFilter;
};
export type ProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadataURI?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    developerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    client?: Prisma.UserOrderByWithRelationInput;
    developer?: Prisma.UserOrderByWithRelationInput;
    milestones?: Prisma.MilestoneOrderByRelationAggregateInput;
};
export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    onchainId?: bigint | number;
    metadataURI?: string;
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    clientId?: Prisma.StringFilter<"Project"> | string;
    developerId?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    client?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    developer?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    milestones?: Prisma.MilestoneListRelationFilter;
}, "id" | "onchainId" | "metadataURI">;
export type ProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadataURI?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    developerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectCountOrderByAggregateInput;
    _avg?: Prisma.ProjectAvgOrderByAggregateInput;
    _max?: Prisma.ProjectMaxOrderByAggregateInput;
    _min?: Prisma.ProjectMinOrderByAggregateInput;
    _sum?: Prisma.ProjectSumOrderByAggregateInput;
};
export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    onchainId?: Prisma.BigIntNullableWithAggregatesFilter<"Project"> | bigint | number | null;
    status?: Prisma.EnumProjectStatusWithAggregatesFilter<"Project"> | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    clientId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    developerId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
};
export type ProjectCreateInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutClientProjectsInput;
    developer: Prisma.UserCreateNestedOneWithoutDeveloperProjectsInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    clientId: string;
    developerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutClientProjectsNestedInput;
    developer?: Prisma.UserUpdateOneRequiredWithoutDeveloperProjectsNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    developerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    clientId: string;
    developerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    developerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectListRelationFilter = {
    every?: Prisma.ProjectWhereInput;
    some?: Prisma.ProjectWhereInput;
    none?: Prisma.ProjectWhereInput;
};
export type ProjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadataURI?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    developerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectAvgOrderByAggregateInput = {
    onchainId?: Prisma.SortOrder;
};
export type ProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadataURI?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    developerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    onchainId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    metadataURI?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    clientId?: Prisma.SortOrder;
    developerId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProjectSumOrderByAggregateInput = {
    onchainId?: Prisma.SortOrder;
};
export type ProjectScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput;
    isNot?: Prisma.ProjectWhereInput;
};
export type ProjectCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput> | Prisma.ProjectCreateWithoutClientInput[] | Prisma.ProjectUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutClientInput | Prisma.ProjectCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.ProjectCreateManyClientInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectCreateNestedManyWithoutDeveloperInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput> | Prisma.ProjectCreateWithoutDeveloperInput[] | Prisma.ProjectUncheckedCreateWithoutDeveloperInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDeveloperInput | Prisma.ProjectCreateOrConnectWithoutDeveloperInput[];
    createMany?: Prisma.ProjectCreateManyDeveloperInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutClientInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput> | Prisma.ProjectCreateWithoutClientInput[] | Prisma.ProjectUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutClientInput | Prisma.ProjectCreateOrConnectWithoutClientInput[];
    createMany?: Prisma.ProjectCreateManyClientInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutDeveloperInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput> | Prisma.ProjectCreateWithoutDeveloperInput[] | Prisma.ProjectUncheckedCreateWithoutDeveloperInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDeveloperInput | Prisma.ProjectCreateOrConnectWithoutDeveloperInput[];
    createMany?: Prisma.ProjectCreateManyDeveloperInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput> | Prisma.ProjectCreateWithoutClientInput[] | Prisma.ProjectUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutClientInput | Prisma.ProjectCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutClientInput | Prisma.ProjectUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.ProjectCreateManyClientInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutClientInput | Prisma.ProjectUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutClientInput | Prisma.ProjectUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUpdateManyWithoutDeveloperNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput> | Prisma.ProjectCreateWithoutDeveloperInput[] | Prisma.ProjectUncheckedCreateWithoutDeveloperInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDeveloperInput | Prisma.ProjectCreateOrConnectWithoutDeveloperInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutDeveloperInput | Prisma.ProjectUpsertWithWhereUniqueWithoutDeveloperInput[];
    createMany?: Prisma.ProjectCreateManyDeveloperInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutDeveloperInput | Prisma.ProjectUpdateWithWhereUniqueWithoutDeveloperInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutDeveloperInput | Prisma.ProjectUpdateManyWithWhereWithoutDeveloperInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutClientNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput> | Prisma.ProjectCreateWithoutClientInput[] | Prisma.ProjectUncheckedCreateWithoutClientInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutClientInput | Prisma.ProjectCreateOrConnectWithoutClientInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutClientInput | Prisma.ProjectUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: Prisma.ProjectCreateManyClientInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutClientInput | Prisma.ProjectUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutClientInput | Prisma.ProjectUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutDeveloperNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput> | Prisma.ProjectCreateWithoutDeveloperInput[] | Prisma.ProjectUncheckedCreateWithoutDeveloperInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutDeveloperInput | Prisma.ProjectCreateOrConnectWithoutDeveloperInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutDeveloperInput | Prisma.ProjectUpsertWithWhereUniqueWithoutDeveloperInput[];
    createMany?: Prisma.ProjectCreateManyDeveloperInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutDeveloperInput | Prisma.ProjectUpdateWithWhereUniqueWithoutDeveloperInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutDeveloperInput | Prisma.ProjectUpdateManyWithWhereWithoutDeveloperInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type EnumProjectStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProjectStatus;
};
export type ProjectCreateNestedOneWithoutMilestonesInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutMilestonesInput, Prisma.ProjectUncheckedCreateWithoutMilestonesInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutMilestonesInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutMilestonesInput, Prisma.ProjectUncheckedCreateWithoutMilestonesInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutMilestonesInput;
    upsert?: Prisma.ProjectUpsertWithoutMilestonesInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutMilestonesInput, Prisma.ProjectUpdateWithoutMilestonesInput>, Prisma.ProjectUncheckedUpdateWithoutMilestonesInput>;
};
export type ProjectCreateWithoutClientInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    developer: Prisma.UserCreateNestedOneWithoutDeveloperProjectsInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutClientInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    developerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutClientInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput>;
};
export type ProjectCreateManyClientInputEnvelope = {
    data: Prisma.ProjectCreateManyClientInput | Prisma.ProjectCreateManyClientInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateWithoutDeveloperInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutClientProjectsInput;
    milestones?: Prisma.MilestoneCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutDeveloperInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    milestones?: Prisma.MilestoneUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutDeveloperInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput>;
};
export type ProjectCreateManyDeveloperInputEnvelope = {
    data: Prisma.ProjectCreateManyDeveloperInput | Prisma.ProjectCreateManyDeveloperInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutClientInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutClientInput, Prisma.ProjectUncheckedUpdateWithoutClientInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutClientInput, Prisma.ProjectUncheckedCreateWithoutClientInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutClientInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutClientInput, Prisma.ProjectUncheckedUpdateWithoutClientInput>;
};
export type ProjectUpdateManyWithWhereWithoutClientInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutClientInput>;
};
export type ProjectScalarWhereInput = {
    AND?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    OR?: Prisma.ProjectScalarWhereInput[];
    NOT?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    onchainId?: Prisma.BigIntNullableFilter<"Project"> | bigint | number | null;
    status?: Prisma.EnumProjectStatusFilter<"Project"> | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFilter<"Project"> | string;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    clientId?: Prisma.StringFilter<"Project"> | string;
    developerId?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
};
export type ProjectUpsertWithWhereUniqueWithoutDeveloperInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutDeveloperInput, Prisma.ProjectUncheckedUpdateWithoutDeveloperInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutDeveloperInput, Prisma.ProjectUncheckedCreateWithoutDeveloperInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutDeveloperInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutDeveloperInput, Prisma.ProjectUncheckedUpdateWithoutDeveloperInput>;
};
export type ProjectUpdateManyWithWhereWithoutDeveloperInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutDeveloperInput>;
};
export type ProjectCreateWithoutMilestonesInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: Prisma.UserCreateNestedOneWithoutClientProjectsInput;
    developer: Prisma.UserCreateNestedOneWithoutDeveloperProjectsInput;
};
export type ProjectUncheckedCreateWithoutMilestonesInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    clientId: string;
    developerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectCreateOrConnectWithoutMilestonesInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutMilestonesInput, Prisma.ProjectUncheckedCreateWithoutMilestonesInput>;
};
export type ProjectUpsertWithoutMilestonesInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutMilestonesInput, Prisma.ProjectUncheckedUpdateWithoutMilestonesInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutMilestonesInput, Prisma.ProjectUncheckedCreateWithoutMilestonesInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutMilestonesInput, Prisma.ProjectUncheckedUpdateWithoutMilestonesInput>;
};
export type ProjectUpdateWithoutMilestonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutClientProjectsNestedInput;
    developer?: Prisma.UserUpdateOneRequiredWithoutDeveloperProjectsNestedInput;
};
export type ProjectUncheckedUpdateWithoutMilestonesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    developerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCreateManyClientInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    developerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectCreateManyDeveloperInput = {
    id?: string;
    onchainId?: bigint | number | null;
    status?: $Enums.ProjectStatus;
    metadataURI: string;
    title: string;
    description?: string | null;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProjectUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    developer?: Prisma.UserUpdateOneRequiredWithoutDeveloperProjectsNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    developerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutClientInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    developerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUpdateWithoutDeveloperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    client?: Prisma.UserUpdateOneRequiredWithoutClientProjectsNestedInput;
    milestones?: Prisma.MilestoneUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutDeveloperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    milestones?: Prisma.MilestoneUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutDeveloperInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    onchainId?: Prisma.NullableBigIntFieldUpdateOperationsInput | bigint | number | null;
    status?: Prisma.EnumProjectStatusFieldUpdateOperationsInput | $Enums.ProjectStatus;
    metadataURI?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    clientId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCountOutputType = {
    milestones: number;
};
export type ProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    milestones?: boolean | ProjectCountOutputTypeCountMilestonesArgs;
};
export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ProjectCountOutputTypeCountMilestonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestoneWhereInput;
};
export type ProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onchainId?: boolean;
    status?: boolean;
    metadataURI?: boolean;
    title?: boolean;
    description?: boolean;
    clientId?: boolean;
    developerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    milestones?: boolean | Prisma.Project$milestonesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onchainId?: boolean;
    status?: boolean;
    metadataURI?: boolean;
    title?: boolean;
    description?: boolean;
    clientId?: boolean;
    developerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    onchainId?: boolean;
    status?: boolean;
    metadataURI?: boolean;
    title?: boolean;
    description?: boolean;
    clientId?: boolean;
    developerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectScalar = {
    id?: boolean;
    onchainId?: boolean;
    status?: boolean;
    metadataURI?: boolean;
    title?: boolean;
    description?: boolean;
    clientId?: boolean;
    developerId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "onchainId" | "status" | "metadataURI" | "title" | "description" | "clientId" | "developerId" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>;
export type ProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    milestones?: boolean | Prisma.Project$milestonesArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    client?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    developer?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Project";
    objects: {
        client: Prisma.$UserPayload<ExtArgs>;
        developer: Prisma.$UserPayload<ExtArgs>;
        milestones: Prisma.$MilestonePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        onchainId: bigint | null;
        status: $Enums.ProjectStatus;
        metadataURI: string;
        title: string;
        description: string | null;
        clientId: string;
        developerId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["project"]>;
    composites: {};
};
export type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectPayload, S>;
export type ProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectCountAggregateInputType | true;
};
export interface ProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Project'];
        meta: {
            name: 'Project';
        };
    };
    findUnique<T extends ProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectCreateArgs>(args: Prisma.SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectDeleteArgs>(args: Prisma.SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectCountArgs>(args?: Prisma.Subset<T, ProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAggregateArgs>(args: Prisma.Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>;
    groupBy<T extends ProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectFieldRefs;
}
export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    client<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    developer<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    milestones<T extends Prisma.Project$milestonesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectFieldRefs {
    readonly id: Prisma.FieldRef<"Project", 'String'>;
    readonly onchainId: Prisma.FieldRef<"Project", 'BigInt'>;
    readonly status: Prisma.FieldRef<"Project", 'ProjectStatus'>;
    readonly metadataURI: Prisma.FieldRef<"Project", 'String'>;
    readonly title: Prisma.FieldRef<"Project", 'String'>;
    readonly description: Prisma.FieldRef<"Project", 'String'>;
    readonly clientId: Prisma.FieldRef<"Project", 'String'>;
    readonly developerId: Prisma.FieldRef<"Project", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Project", 'DateTime'>;
}
export type ProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
};
export type ProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type ProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
    include?: Prisma.ProjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
};
export type ProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type Project$milestonesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where?: Prisma.MilestoneWhereInput;
    orderBy?: Prisma.MilestoneOrderByWithRelationInput | Prisma.MilestoneOrderByWithRelationInput[];
    cursor?: Prisma.MilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MilestoneScalarFieldEnum | Prisma.MilestoneScalarFieldEnum[];
};
export type ProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
};
