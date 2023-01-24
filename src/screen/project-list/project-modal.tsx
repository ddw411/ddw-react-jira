import styled from "@emotion/styled";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "../../utils/project";
import { useProjectModal, useProjectsQueryKey } from "./util";

export const ProjectModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
    const title = editingProject ? '编辑项目' : '创建项目'
    const useMutateProject = editingProject ? useEditProject : useAddProject
    const {mutateAsync, error, isLoading: mutateLoading} = useMutateProject(useProjectsQueryKey())
    // antd表单控制hook
    const [form] = useForm()
    const onFinish = (values: any) => {
        // then(onfulfilled,onreject)
        mutateAsync({...editingProject, ...values}).then(() => {
                // 置空表单
                form.resetFields()
                // 关闭界面
                close()
            }
        )
    }

    useEffect(() => {
        // form控制表达数据，更新字段数据 -- 类似[fieldsValue,setFieldsValue] = useFormField()
        // 同步
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    return (
        //@ts-ignore
        <Drawer
            forceRender={true}
            onClose={close}
            visible={projectModalOpen}
            width={"100%"}
            //@ts-ignore
            forceRender={true}
        >
            <Container>
                {isLoading ? (
                    <Spin size={"large"} />
                ) : (
                    <>
                        <h1>{title}</h1>
                        <ErrorBox error={error} />
                        <Form
                            form={form}
                            layout={"vertical"}
                            style={{ width: "40rem" }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={"名称"}
                                name={"name"}
                                rules={[{ required: true, message: "请输入项目名" }]}
                            >
                                <Input placeholder={"请输入项目名称"} />
                            </Form.Item>

                            <Form.Item
                                label={"部门"}
                                name={"organization"}
                                rules={[{ required: true, message: "请输入部门名" }]}
                            >
                                <Input placeholder={"请输入部门名"} />
                            </Form.Item>

                            <Form.Item label={"负责人"} name={"personId"}>
                                <UserSelect defaultOptionName={"负责人"} />
                            </Form.Item>

                            <Form.Item style={{ textAlign: "right" }}>
                                <Button
                                    loading={mutateLoading}
                                    type={"primary"}
                                    htmlType={"submit"}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;