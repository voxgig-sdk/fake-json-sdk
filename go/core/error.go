package core

type FakeJsonError struct {
	IsFakeJsonError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFakeJsonError(code string, msg string, ctx *Context) *FakeJsonError {
	return &FakeJsonError{
		IsFakeJsonError: true,
		Sdk:              "FakeJson",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FakeJsonError) Error() string {
	return e.Msg
}
