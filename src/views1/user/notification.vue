
<template>
    <div style="width:100%;height:100vh">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="display: inline-block;
    margin-top: 0.5rem;
    font-size: 1rem;
    text-decoration: none;
    color: #000000;
    border-bottom: 0.125rem solid #258AD9;
    margin-bottom: 1rem;
    padding: 0.3rem;
    ">
            <el-breadcrumb-item :to="{ path: '/toArchiveHome' }">档案管理</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>通知配置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="messhoustadd"
                    style="background: #498DFB;border: none;width:5rem ;height: 2.2rem;border-radius: 0;">保存</el-button>
            </el-form-item>
        </el-form>
        <div class="col-10 contentRight" style="height:100%;">
            <div>
                <div style="height:100%">
                    <div class="RightCenter" style="height: 73vh;margin-left: 2vw;">
                        <div style="width:97%;margin-left:2vw;height:5vh">
                            <div class="row" id="controllist">
                                <div class="col-6" style="border-right:1px solid gray">
                                    <div style="float:right;margin-right: 2vw;cursor: pointer;" onclick="change(1,this)"
                                        id="menlei">管理员设置</div>
                                </div>
                                <div class="col-6">
                                    <div style="float:left;margin-left: 2vw;cursor: pointer;" onclick="change(2,this)"
                                        id="shezhi">借阅人设置</div>
                                </div>
                            </div>
                        </div>
                        <div style="width:97%;height:74vh">
                            <div class="archivesCategory" style="">
                                <div style="height: 33vh;">
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw;display: flex;align-items: center;">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">电话:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw;width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="telephoneonelist"
                                                    aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="row g-3 align-items-center a adda listLength" style="padding-left: 5vw;display: flex;
    align-items: center;">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">邮箱:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw; width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="mailboxlist" aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; height:5vh;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw; display: flex;
    align-items: center;">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">工作模式:</label>
                                            </div>
                                            <div class="col-auto col-5" style="width: 30rem;display: flex;">
                                                <div class="form-check" style="display: flex;">
                                                    <input class="form-check-input" type="checkbox" value="" id="allSelect">
                                                    <label class="form-check-label" for="allSelect">
                                                        全选
                                                    </label>
                                                    <div id="dataTable" style="display: flex; align-items: center;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" rid="1"
                                                                id="telephoneone">
                                                            <label class="form-check-label" for="telephoneone">
                                                                电话
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" rid="2"
                                                                id="Shortmessagelist">
                                                            <label class="form-check-label" for="Shortmessagelist">
                                                                短信
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" rid="3"
                                                                id="mailboxlistonelist">
                                                            <label class="form-check-label" for="mailboxlistonelist">
                                                                邮箱
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; height:5vh;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto"
                                                style="display: flex; align-items: center;padding-left: 6vw;">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">工作时间:</label>
                                                <div class="col-sm-4" style="width: 11vw;margin-left: 1vw;">
                                                    <input style="border-radius: 0;width:10vw;" type="time" id="startTime"
                                                        class="form-control">
                                                </div>
                                                <label style="margin-left: .5vw;">至:</label>
                                                <div class="col-sm-4" style="width: 11vw;">
                                                    <input style="border-radius: 0;margin-left: 0.5vw;width:10vw;" type="time"
                                                        id="endTime" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center;padding-left: 6vw;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">报警周期:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="alarmcycle" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh;text-align: center;width:vw;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">小时后提醒</div>




                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto" style="margin-left: 2rem;">
                                                <label class="col-form-label">重复次数:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;width: 6rem;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="Nurepeats" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh;margin-right: 1vw;text-align: center;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">次</div>
                                    </div>


                                </div>
                                <div style="background: #F5F5F5; height: 37vh;">
                                    <div
                                        style="display: flex; align-items: center;justify-content: space-between;padding: 10px 20px;">
                                        <h3 style="font-size: 1.1rem;font-weight: bold;">运行状态验证</h3>
                                        <div>[可选填]</div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw;padding-left: 6vw;display: flex;align-items: center;">
                                            <div class="col-auto">
                                                <label class="col-form-label">管理员电话:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw;width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="telephonelist" aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 5vw;display: flex; align-items: center;">
                                            <div class="col-auto">
                                                <label class="col-form-label">管理员邮箱:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw; width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="mailbox" aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw; display: flex;align-items: center;height: 5vh;">
                                            <div class="col-auto">
                                                <label class="col-form-label">工作模式:</label>
                                            </div>
                                            <div class="col-auto col-5" style="width: 30rem;display: flex;">
                                                <div class="form-check" style="display: flex;">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                        id="allSelectlist">
                                                    <label class="form-check-label" for="allSelectlist">
                                                        全选
                                                    </label>
                                                    <div id="dataTablelist" style="display: flex; align-items: center;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="Borrowersnumber">
                                                            <label class="form-check-label" for="Borrowersnumber">
                                                                电话
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="Borrowertextmessage">
                                                            <label class="form-check-label" for="Borrowertextmessage">
                                                                短信
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="Borrowermailbox">
                                                            <label class="form-check-label" for="Borrowermailbox">
                                                                邮箱
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center;padding-left: 6vw;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto">
                                                <label class="col-form-label">重复验证时间:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;width: 6rem;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="Duplicateverification" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh;text-align: center;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">天</div>
                                    </div>
                                    <div
                                        style="display: flex;align-items: center; justify-content: space-between;padding: 10px 30px 30px;">
                                        <div style="padding-left: 6vw;    font-size: .8rem;color: #A9A9A9;">
                                            <span>*</span>
                                            此功能用来验证设备功能是否正常工作
                                        </div>
                                        <div type="button" class="btn btn-outline-primary" style="width: 6vw;
                                            height: 4vh;
                                            border: 1px solid #ccc;
                                            text-align: center;
                                            line-height: 4.5vh;
                                            margin-top: -0.2vh;
                                            border-radius: 0;" onclick="Administratortest()">测试</div>
                                    </div>
                                </div>
                            </div>
                            <div class="fileSettings" style="">
                                <div style="height: 33vh;">
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw;">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">工作模式:</label>
                                            </div>
                                            <div class="col-auto col-5" style="width: 30rem;display: flex;">
                                                <div class="form-check" style="display: flex;">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                        id="allSelectlistone">
                                                    <label class="form-check-label" for="allSelectlistone">
                                                        全选
                                                    </label>
                                                    <div id="dataTablelistone" style="display: flex; align-items: center;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="telephoneware">
                                                            <label class="form-check-label" for="telephoneware">
                                                                电话
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="Shortmessageware">
                                                            <label class="form-check-label" for="Shortmessageware">
                                                                短信
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="mailboxlistware">
                                                            <label class="form-check-label" for="mailboxlistware">
                                                                邮箱
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto"
                                                style="display: flex; align-items: center;padding-left: 6vw;">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">工作时间:</label>
                                                <div class="col-sm-4" style="width: 11vw;margin-left: 1vw;">
                                                    <input style="border-radius: 0;" type="time" id="startTimeware"
                                                        class="form-control">
                                                </div>
                                                <label style="margin-left: .5vw;">至:</label>
                                                <div class="col-sm-4" style="width: 11vw;">
                                                    <input style="border-radius: 0;margin-left: 0.5vw;" type="time"
                                                        id="endTimeware" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center;padding-left: 6vw;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto">
                                                <span style="color: red;">*</span>
                                                <label class="col-form-label">报警周期:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;width: 6rem;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="Alarmcycleware" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh; text-align: center;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">小时后提醒</div>


                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto" style="margin-left: 2rem;">
                                                <label class="col-form-label">重复次数:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;width: 6rem;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="Nurepeatslistware" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh;margin-right: 1vw;text-align: center;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">次</div>
                                    </div>
                                </div>
                                <div style="background: #F5F5F5; height: 37vh;">
                                    <div
                                        style="display: flex; align-items: center;justify-content: space-between;padding: 10px 20px;">
                                        <h3 style="font-size: 1.1rem;font-weight: bold;">运行状态验证</h3>
                                        <div>[可选填]</div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw;">
                                            <div class="col-auto">
                                                <label class="col-form-label">管理员电话:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw;width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="Administratorware"
                                                    aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 5vw;">
                                            <div class="col-auto">
                                                <label class="col-form-label">管理员邮箱:</label>
                                            </div>
                                            <div class="col-auto col-5" style="margin-left: 1vw; width: 25rem;">
                                                <input class="form-control form-control-sm lineList" type="text"
                                                    placeholder="" id="Administratorwarelist"
                                                    aria-label=".form-control-sm example"
                                                    style="border-radius: 0;height: 4vh;">
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex;">
                                        <div class="row g-3 align-items-center a adda listLength"
                                            style="padding-left: 6vw;">
                                            <div class="col-auto">
                                                <label class="col-form-label">工作模式:</label>
                                            </div>
                                            <div class="col-auto col-5" style="width: 30rem;display: flex;">
                                                <div class="form-check" style="display: flex;">
                                                    <input class="form-check-input" type="checkbox" value=""
                                                        id="allSelectlisttow">
                                                    <label class="form-check-label" for="allSelectlisttow">
                                                        全选
                                                    </label>
                                                    <div id="dataTablelisttow" style="display: flex; align-items: center;">
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="telephonewarelist">
                                                            <label class="form-check-label" for="telephonewarelist">
                                                                电话
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="Shortmessagewarelist">
                                                            <label class="form-check-label" for="Shortmessagewarelist">
                                                                短信
                                                            </label>
                                                        </div>
                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value=""
                                                                id="mailboxlistonetlist">
                                                            <label class="form-check-label" for="mailboxlistonetlist">
                                                                邮箱
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                    </div>
                                    <div style="display: flex; align-items: center;padding-left: 6vw;">
                                        <div class="row g-3 align-items-center a adda listLength">
                                            <div class="col-auto">
                                                <label class="col-form-label">重复验证时间:</label>
                                            </div>
                                            <div class="col-4"></div>
                                        </div>
                                        <div class="col-auto col-5" style="margin-left: 1vw;width: 6rem;">
                                            <input class="form-control form-control-sm lineList" type="text" placeholder=""
                                                id="Duplicateverificationtime" aria-label=".form-control-sm example"
                                                style="border-radius: 0;height: 4vh;text-align: center;">
                                        </div>
                                        <div style="margin-left: 0.5vw;">天</div>
                                    </div>
                                    <div
                                        style="display: flex;align-items: center; justify-content: space-between;padding: 10px 30px 30px;">
                                        <div style="padding-left: 6vw;    font-size: .8rem;color: #A9A9A9;">
                                            <span>*</span>
                                            此功能用来验证设备功能是否正常工作
                                        </div>
                                        <div type="button" class="btn btn-outline-primary" style="width: 6vw;
                                            height: 4vh;
                                            border: 1px solid #ccc;
                                            text-align: center;
                                            line-height: 2.5vh;
                                            margin-top: -0.2vh;
                                            border-radius: 0;" onclick="Theborrowertest()">测试</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.RightHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

html::-webkit-scrollbar {
    display: none
}

.RightHeader ul {
    display: flex;
}

.RightHeader ul li {
    margin-left: 10px;
}

.from {
    display: flex;
    align-items: center;
    margin-left: 1.4vw;
    margin-top: -1.5vh;
}

.from div {
    margin-left: 10px;
}


.from label {
    margin-left: 10px;
    font-size: 15px;
    white-space: nowrap;
    font-weight: 700;
}

.btn-primary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}

.btn-danger {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}


.btn-light {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}


.cnterTable {
    width: 100%;
    padding: 5px 10px;
}





.form-select {
    height: 30px;
    font-size: 13px;
}



.modal-body {
    max-height: 30.5rem;
    max-width: 30.5rem;
    overflow-y: scroll;
}


.tree {
    margin: 0 auto;
}






.form-control {
    height: 32px;
    font-size: 13px;
    border-radius: 0;
}


.btn-success {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
    border-radius: 0;
}



.btn-outline-primary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}

.btn-outline-danger {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}

.btn-secondary {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}

.btn-info {
    width: 5rem;
    font-size: 14px;
    height: 2rem;
}

.Centerbutton {
    display: flex;
    padding: 5px 10px;
}

.Centerbutton div {
    margin-left: 10px;
    margin-top: 10px;
}


.fromtime div {
    padding: 3px 5px;
}


.headfrom {
    width: 56%;
    max-height: 300px;
    margin-left: 6px;
    overflow-y: scroll;
    border: 1px solid #ccc;
    margin-bottom: 5px;
}



.permissionInput {
    margin-left: 15px;
}


.contentHeader {
    display: flex;
    align-items: center;
}




.modal-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: transparent;
}

.modal-body::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 4px;
}

.modal-body:hover::-webkit-scrollbar-thumb {
    background: hsla(0, 0%, 53%, 0.4);
}

.modal-body:hover::-webkit-scrollbar-track {
    background: hsla(0, 0%, 53%, 0.1);
}





.FooterPageindex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}



.tree {
    margin: 0 auto;
}

html::-webkit-scrollbar {
    display: none
}


.form-check {
    padding-left: 2.5em;
}

.g-3,
.gy-3 {
    --bs-gutter-y: .9rem;
}
</style>
<script>
export default {
    data() {
        return {
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: []
        }
    },
    methods: {
        messhoustadd() {
            console.log('messhoustadd!');
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>