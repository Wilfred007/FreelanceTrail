import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MilestoneModel = runtime.Types.Result.DefaultSelection<Prisma.$MilestonePayload>;
export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null;
    _avg: MilestoneAvgAggregateOutputType | null;
    _sum: MilestoneSumAggregateOutputType | null;
    _min: MilestoneMinAggregateOutputType | null;
    _max: MilestoneMaxAggregateOutputType | null;
};
export type MilestoneAvgAggregateOutputType = {
    index: number | null;
    amount: runtime.Decimal | null;
};
export type MilestoneSumAggregateOutputType = {
    index: number | null;
    amount: runtime.Decimal | null;
};
export type MilestoneMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    index: number | null;
    description: string | null;
    amount: runtime.Decimal | null;
    status: $Enums.MilestoneStatus | null;
    proofURI: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MilestoneMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    index: number | null;
    description: string | null;
    amount: runtime.Decimal | null;
    status: $Enums.MilestoneStatus | null;
    proofURI: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type MilestoneCountAggregateOutputType = {
    id: number;
    projectId: number;
    index: number;
    description: number;
    amount: number;
    status: number;
    proofURI: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type MilestoneAvgAggregateInputType = {
    index?: true;
    amount?: true;
};
export type MilestoneSumAggregateInputType = {
    index?: true;
    amount?: true;
};
export type MilestoneMinAggregateInputType = {
    id?: true;
    projectId?: true;
    index?: true;
    description?: true;
    amount?: true;
    status?: true;
    proofURI?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MilestoneMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    index?: true;
    description?: true;
    amount?: true;
    status?: true;
    proofURI?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type MilestoneCountAggregateInputType = {
    id?: true;
    projectId?: true;
    index?: true;
    description?: true;
    amount?: true;
    status?: true;
    proofURI?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MilestoneAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestoneWhereInput;
    orderBy?: Prisma.MilestoneOrderByWithRelationInput | Prisma.MilestoneOrderByWithRelationInput[];
    cursor?: Prisma.MilestoneWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MilestoneCountAggregateInputType;
    _avg?: MilestoneAvgAggregateInputType;
    _sum?: MilestoneSumAggregateInputType;
    _min?: MilestoneMinAggregateInputType;
    _max?: MilestoneMaxAggregateInputType;
};
export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
    [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMilestone[P]> : Prisma.GetScalarType<T[P], AggregateMilestone[P]>;
};
export type MilestoneGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestoneWhereInput;
    orderBy?: Prisma.MilestoneOrderByWithAggregationInput | Prisma.MilestoneOrderByWithAggregationInput[];
    by: Prisma.MilestoneScalarFieldEnum[] | Prisma.MilestoneScalarFieldEnum;
    having?: Prisma.MilestoneScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MilestoneCountAggregateInputType | true;
    _avg?: MilestoneAvgAggregateInputType;
    _sum?: MilestoneSumAggregateInputType;
    _min?: MilestoneMinAggregateInputType;
    _max?: MilestoneMaxAggregateInputType;
};
export type MilestoneGroupByOutputType = {
    id: string;
    projectId: string;
    index: number;
    description: string | null;
    amount: runtime.Decimal;
    status: $Enums.MilestoneStatus;
    proofURI: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: MilestoneCountAggregateOutputType | null;
    _avg: MilestoneAvgAggregateOutputType | null;
    _sum: MilestoneSumAggregateOutputType | null;
    _min: MilestoneMinAggregateOutputType | null;
    _max: MilestoneMaxAggregateOutputType | null;
};
export type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MilestoneGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MilestoneGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MilestoneGroupByOutputType[P]>;
}>>;
export type MilestoneWhereInput = {
    AND?: Prisma.MilestoneWhereInput | Prisma.MilestoneWhereInput[];
    OR?: Prisma.MilestoneWhereInput[];
    NOT?: Prisma.MilestoneWhereInput | Prisma.MilestoneWhereInput[];
    id?: Prisma.StringFilter<"Milestone"> | string;
    projectId?: Prisma.StringFilter<"Milestone"> | string;
    index?: Prisma.IntFilter<"Milestone"> | number;
    description?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    amount?: Prisma.DecimalFilter<"Milestone"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFilter<"Milestone"> | $Enums.MilestoneStatus;
    proofURI?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
};
export type MilestoneOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    proofURI?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
    payment?: Prisma.PaymentOrderByWithRelationInput;
};
export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    projectId_index?: Prisma.MilestoneProjectIdIndexCompoundUniqueInput;
    AND?: Prisma.MilestoneWhereInput | Prisma.MilestoneWhereInput[];
    OR?: Prisma.MilestoneWhereInput[];
    NOT?: Prisma.MilestoneWhereInput | Prisma.MilestoneWhereInput[];
    projectId?: Prisma.StringFilter<"Milestone"> | string;
    index?: Prisma.IntFilter<"Milestone"> | number;
    description?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    amount?: Prisma.DecimalFilter<"Milestone"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFilter<"Milestone"> | $Enums.MilestoneStatus;
    proofURI?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    payment?: Prisma.XOR<Prisma.PaymentNullableScalarRelationFilter, Prisma.PaymentWhereInput> | null;
}, "id" | "projectId_index">;
export type MilestoneOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    proofURI?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MilestoneCountOrderByAggregateInput;
    _avg?: Prisma.MilestoneAvgOrderByAggregateInput;
    _max?: Prisma.MilestoneMaxOrderByAggregateInput;
    _min?: Prisma.MilestoneMinOrderByAggregateInput;
    _sum?: Prisma.MilestoneSumOrderByAggregateInput;
};
export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: Prisma.MilestoneScalarWhereWithAggregatesInput | Prisma.MilestoneScalarWhereWithAggregatesInput[];
    OR?: Prisma.MilestoneScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MilestoneScalarWhereWithAggregatesInput | Prisma.MilestoneScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Milestone"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"Milestone"> | string;
    index?: Prisma.IntWithAggregatesFilter<"Milestone"> | number;
    description?: Prisma.StringNullableWithAggregatesFilter<"Milestone"> | string | null;
    amount?: Prisma.DecimalWithAggregatesFilter<"Milestone"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusWithAggregatesFilter<"Milestone"> | $Enums.MilestoneStatus;
    proofURI?: Prisma.StringNullableWithAggregatesFilter<"Milestone"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Milestone"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Milestone"> | Date | string;
};
export type MilestoneCreateInput = {
    id?: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutMilestonesInput;
    payment?: Prisma.PaymentCreateNestedOneWithoutMilestoneInput;
};
export type MilestoneUncheckedCreateInput = {
    id?: string;
    projectId: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutMilestoneInput;
};
export type MilestoneUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutMilestonesNestedInput;
    payment?: Prisma.PaymentUpdateOneWithoutMilestoneNestedInput;
};
export type MilestoneUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutMilestoneNestedInput;
};
export type MilestoneCreateManyInput = {
    id?: string;
    projectId: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MilestoneUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestoneUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestoneListRelationFilter = {
    every?: Prisma.MilestoneWhereInput;
    some?: Prisma.MilestoneWhereInput;
    none?: Prisma.MilestoneWhereInput;
};
export type MilestoneOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MilestoneProjectIdIndexCompoundUniqueInput = {
    projectId: string;
    index: number;
};
export type MilestoneCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    proofURI?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MilestoneAvgOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type MilestoneMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    proofURI?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MilestoneMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    index?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    proofURI?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MilestoneSumOrderByAggregateInput = {
    index?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
};
export type MilestoneScalarRelationFilter = {
    is?: Prisma.MilestoneWhereInput;
    isNot?: Prisma.MilestoneWhereInput;
};
export type MilestoneCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput> | Prisma.MilestoneCreateWithoutProjectInput[] | Prisma.MilestoneUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutProjectInput | Prisma.MilestoneCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.MilestoneCreateManyProjectInputEnvelope;
    connect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
};
export type MilestoneUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput> | Prisma.MilestoneCreateWithoutProjectInput[] | Prisma.MilestoneUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutProjectInput | Prisma.MilestoneCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.MilestoneCreateManyProjectInputEnvelope;
    connect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
};
export type MilestoneUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput> | Prisma.MilestoneCreateWithoutProjectInput[] | Prisma.MilestoneUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutProjectInput | Prisma.MilestoneCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.MilestoneUpsertWithWhereUniqueWithoutProjectInput | Prisma.MilestoneUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.MilestoneCreateManyProjectInputEnvelope;
    set?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    disconnect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    delete?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    connect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    update?: Prisma.MilestoneUpdateWithWhereUniqueWithoutProjectInput | Prisma.MilestoneUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.MilestoneUpdateManyWithWhereWithoutProjectInput | Prisma.MilestoneUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.MilestoneScalarWhereInput | Prisma.MilestoneScalarWhereInput[];
};
export type MilestoneUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput> | Prisma.MilestoneCreateWithoutProjectInput[] | Prisma.MilestoneUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutProjectInput | Prisma.MilestoneCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.MilestoneUpsertWithWhereUniqueWithoutProjectInput | Prisma.MilestoneUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.MilestoneCreateManyProjectInputEnvelope;
    set?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    disconnect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    delete?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    connect?: Prisma.MilestoneWhereUniqueInput | Prisma.MilestoneWhereUniqueInput[];
    update?: Prisma.MilestoneUpdateWithWhereUniqueWithoutProjectInput | Prisma.MilestoneUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.MilestoneUpdateManyWithWhereWithoutProjectInput | Prisma.MilestoneUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.MilestoneScalarWhereInput | Prisma.MilestoneScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type EnumMilestoneStatusFieldUpdateOperationsInput = {
    set?: $Enums.MilestoneStatus;
};
export type MilestoneCreateNestedOneWithoutPaymentInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutPaymentInput, Prisma.MilestoneUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutPaymentInput;
    connect?: Prisma.MilestoneWhereUniqueInput;
};
export type MilestoneUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: Prisma.XOR<Prisma.MilestoneCreateWithoutPaymentInput, Prisma.MilestoneUncheckedCreateWithoutPaymentInput>;
    connectOrCreate?: Prisma.MilestoneCreateOrConnectWithoutPaymentInput;
    upsert?: Prisma.MilestoneUpsertWithoutPaymentInput;
    connect?: Prisma.MilestoneWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.MilestoneUpdateToOneWithWhereWithoutPaymentInput, Prisma.MilestoneUpdateWithoutPaymentInput>, Prisma.MilestoneUncheckedUpdateWithoutPaymentInput>;
};
export type MilestoneCreateWithoutProjectInput = {
    id?: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentCreateNestedOneWithoutMilestoneInput;
};
export type MilestoneUncheckedCreateWithoutProjectInput = {
    id?: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    payment?: Prisma.PaymentUncheckedCreateNestedOneWithoutMilestoneInput;
};
export type MilestoneCreateOrConnectWithoutProjectInput = {
    where: Prisma.MilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput>;
};
export type MilestoneCreateManyProjectInputEnvelope = {
    data: Prisma.MilestoneCreateManyProjectInput | Prisma.MilestoneCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type MilestoneUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.MilestoneWhereUniqueInput;
    update: Prisma.XOR<Prisma.MilestoneUpdateWithoutProjectInput, Prisma.MilestoneUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.MilestoneCreateWithoutProjectInput, Prisma.MilestoneUncheckedCreateWithoutProjectInput>;
};
export type MilestoneUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.MilestoneWhereUniqueInput;
    data: Prisma.XOR<Prisma.MilestoneUpdateWithoutProjectInput, Prisma.MilestoneUncheckedUpdateWithoutProjectInput>;
};
export type MilestoneUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.MilestoneScalarWhereInput;
    data: Prisma.XOR<Prisma.MilestoneUpdateManyMutationInput, Prisma.MilestoneUncheckedUpdateManyWithoutProjectInput>;
};
export type MilestoneScalarWhereInput = {
    AND?: Prisma.MilestoneScalarWhereInput | Prisma.MilestoneScalarWhereInput[];
    OR?: Prisma.MilestoneScalarWhereInput[];
    NOT?: Prisma.MilestoneScalarWhereInput | Prisma.MilestoneScalarWhereInput[];
    id?: Prisma.StringFilter<"Milestone"> | string;
    projectId?: Prisma.StringFilter<"Milestone"> | string;
    index?: Prisma.IntFilter<"Milestone"> | number;
    description?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    amount?: Prisma.DecimalFilter<"Milestone"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFilter<"Milestone"> | $Enums.MilestoneStatus;
    proofURI?: Prisma.StringNullableFilter<"Milestone"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Milestone"> | Date | string;
};
export type MilestoneCreateWithoutPaymentInput = {
    id?: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutMilestonesInput;
};
export type MilestoneUncheckedCreateWithoutPaymentInput = {
    id?: string;
    projectId: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MilestoneCreateOrConnectWithoutPaymentInput = {
    where: Prisma.MilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestoneCreateWithoutPaymentInput, Prisma.MilestoneUncheckedCreateWithoutPaymentInput>;
};
export type MilestoneUpsertWithoutPaymentInput = {
    update: Prisma.XOR<Prisma.MilestoneUpdateWithoutPaymentInput, Prisma.MilestoneUncheckedUpdateWithoutPaymentInput>;
    create: Prisma.XOR<Prisma.MilestoneCreateWithoutPaymentInput, Prisma.MilestoneUncheckedCreateWithoutPaymentInput>;
    where?: Prisma.MilestoneWhereInput;
};
export type MilestoneUpdateToOneWithWhereWithoutPaymentInput = {
    where?: Prisma.MilestoneWhereInput;
    data: Prisma.XOR<Prisma.MilestoneUpdateWithoutPaymentInput, Prisma.MilestoneUncheckedUpdateWithoutPaymentInput>;
};
export type MilestoneUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutMilestonesNestedInput;
};
export type MilestoneUncheckedUpdateWithoutPaymentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestoneCreateManyProjectInput = {
    id?: string;
    index: number;
    description?: string | null;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.MilestoneStatus;
    proofURI?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type MilestoneUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUpdateOneWithoutMilestoneNestedInput;
};
export type MilestoneUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    payment?: Prisma.PaymentUncheckedUpdateOneWithoutMilestoneNestedInput;
};
export type MilestoneUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    index?: Prisma.IntFieldUpdateOperationsInput | number;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumMilestoneStatusFieldUpdateOperationsInput | $Enums.MilestoneStatus;
    proofURI?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MilestoneSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    index?: boolean;
    description?: boolean;
    amount?: boolean;
    status?: boolean;
    proofURI?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    payment?: boolean | Prisma.Milestone$paymentArgs<ExtArgs>;
}, ExtArgs["result"]["milestone"]>;
export type MilestoneSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    index?: boolean;
    description?: boolean;
    amount?: boolean;
    status?: boolean;
    proofURI?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["milestone"]>;
export type MilestoneSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    index?: boolean;
    description?: boolean;
    amount?: boolean;
    status?: boolean;
    proofURI?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["milestone"]>;
export type MilestoneSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    index?: boolean;
    description?: boolean;
    amount?: boolean;
    status?: boolean;
    proofURI?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type MilestoneOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "index" | "description" | "amount" | "status" | "proofURI" | "createdAt" | "updatedAt", ExtArgs["result"]["milestone"]>;
export type MilestoneInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    payment?: boolean | Prisma.Milestone$paymentArgs<ExtArgs>;
};
export type MilestoneIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type MilestoneIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type $MilestonePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Milestone";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
        payment: Prisma.$PaymentPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string;
        index: number;
        description: string | null;
        amount: runtime.Decimal;
        status: $Enums.MilestoneStatus;
        proofURI: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["milestone"]>;
    composites: {};
};
export type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MilestonePayload, S>;
export type MilestoneCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MilestoneCountAggregateInputType | true;
};
export interface MilestoneDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Milestone'];
        meta: {
            name: 'Milestone';
        };
    };
    findUnique<T extends MilestoneFindUniqueArgs>(args: Prisma.SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MilestoneFindFirstArgs>(args?: Prisma.SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MilestoneFindManyArgs>(args?: Prisma.SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MilestoneCreateArgs>(args: Prisma.SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MilestoneCreateManyArgs>(args?: Prisma.SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MilestoneDeleteArgs>(args: Prisma.SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MilestoneUpdateArgs>(args: Prisma.SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: Prisma.SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MilestoneUpdateManyArgs>(args: Prisma.SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MilestoneUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MilestoneUpsertArgs>(args: Prisma.SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma.Prisma__MilestoneClient<runtime.Types.Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MilestoneCountArgs>(args?: Prisma.Subset<T, MilestoneCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MilestoneCountAggregateOutputType> : number>;
    aggregate<T extends MilestoneAggregateArgs>(args: Prisma.Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>;
    groupBy<T extends MilestoneGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MilestoneGroupByArgs['orderBy'];
    } : {
        orderBy?: MilestoneGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MilestoneFieldRefs;
}
export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    payment<T extends Prisma.Milestone$paymentArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Milestone$paymentArgs<ExtArgs>>): Prisma.Prisma__PaymentClient<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MilestoneFieldRefs {
    readonly id: Prisma.FieldRef<"Milestone", 'String'>;
    readonly projectId: Prisma.FieldRef<"Milestone", 'String'>;
    readonly index: Prisma.FieldRef<"Milestone", 'Int'>;
    readonly description: Prisma.FieldRef<"Milestone", 'String'>;
    readonly amount: Prisma.FieldRef<"Milestone", 'Decimal'>;
    readonly status: Prisma.FieldRef<"Milestone", 'MilestoneStatus'>;
    readonly proofURI: Prisma.FieldRef<"Milestone", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Milestone", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Milestone", 'DateTime'>;
}
export type MilestoneFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where: Prisma.MilestoneWhereUniqueInput;
};
export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where: Prisma.MilestoneWhereUniqueInput;
};
export type MilestoneFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MilestoneFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MilestoneFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MilestoneCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestoneCreateInput, Prisma.MilestoneUncheckedCreateInput>;
};
export type MilestoneCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MilestoneCreateManyInput | Prisma.MilestoneCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MilestoneCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    data: Prisma.MilestoneCreateManyInput | Prisma.MilestoneCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MilestoneIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MilestoneUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestoneUpdateInput, Prisma.MilestoneUncheckedUpdateInput>;
    where: Prisma.MilestoneWhereUniqueInput;
};
export type MilestoneUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MilestoneUpdateManyMutationInput, Prisma.MilestoneUncheckedUpdateManyInput>;
    where?: Prisma.MilestoneWhereInput;
    limit?: number;
};
export type MilestoneUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MilestoneUpdateManyMutationInput, Prisma.MilestoneUncheckedUpdateManyInput>;
    where?: Prisma.MilestoneWhereInput;
    limit?: number;
    include?: Prisma.MilestoneIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MilestoneUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where: Prisma.MilestoneWhereUniqueInput;
    create: Prisma.XOR<Prisma.MilestoneCreateInput, Prisma.MilestoneUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MilestoneUpdateInput, Prisma.MilestoneUncheckedUpdateInput>;
};
export type MilestoneDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
    where: Prisma.MilestoneWhereUniqueInput;
};
export type MilestoneDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MilestoneWhereInput;
    limit?: number;
};
export type Milestone$paymentArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
};
export type MilestoneDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MilestoneSelect<ExtArgs> | null;
    omit?: Prisma.MilestoneOmit<ExtArgs> | null;
    include?: Prisma.MilestoneInclude<ExtArgs> | null;
};
