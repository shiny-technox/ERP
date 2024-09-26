<?php

use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\employee\EmployeeScheduleInterviewController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ManageAttendanceController;
use App\Http\Controllers\ManageDomainController;
use App\Http\Controllers\ManageHostingController;
use App\Http\Controllers\ManageLeadsController;
use App\Http\Controllers\ManageProjectController;
use App\Http\Controllers\ManageSalesController;
use App\Http\Controllers\ManageSSLController;
use App\Http\Controllers\ManageTaskController;
use App\Http\Controllers\WorkLogController;
use App\Models\ManageSSL;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('logout',[AuthController::class,'logout'])->middleware('auth:sanctum');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::get('employee',[EmployeeController::class,'index']);
Route::post('employee/create',[EmployeeController::class,'store']);
Route::get('employee/{id}',[EmployeeController::class,'show']);
Route::post('employee/update/{id}',[EmployeeController::class,'update']);
Route::post('employee/profile_update/{id}',[EmployeeController::class,'profileUpdate']);
Route::post('employee/profile/{id}',[EmployeeController::class,'profile']);
Route::post('employee/change-password/{id}',[EmployeeController::class,'updatePassword']);

Route::delete('employee/delete/{id}',[EmployeeController::class,'destroy']);

Route::get('manage_project',[ManageProjectController::class,'index']);
Route::post('manage_project/create',[ManageProjectController::class,'store']);
Route::get('manage_project/{id}',[ManageProjectController::class,'edit']);
Route::post('manage_project/update/{id}',[ManageProjectController::class,'update']);
Route::delete('manage_project/delete/{id}',[ManageProjectController::class,'destroy']);

Route::get('manage_task',[ManageTaskController::class,'index']);
Route::post('manage_task/store',[ManageTaskController::class,'store']);
Route::get('manage_task/{id}',[ManageTaskController::class,'edit']);
Route::post('manage_task/update/{id}',[ManageTaskController::class,'update']);
Route::delete('manage_task/delete/{id}',[ManageTaskController::class,'destroy']);

Route::get('manage_attendance',[ManageAttendanceController::class,'index']);
Route::get('manage_attendance/show/{id}',[ManageAttendanceController::class,'show']);
Route::post('manage_attendance/store',[ManageAttendanceController::class,'store']);
Route::post('manage_attendance/update/{id}',[ManageAttendanceController::class,'update']);

Route::get('manage_domain',[ManageDomainController::class,'index']);
Route::get('manage_domain/{id}',[ManageDomainController::class,'edit']);
Route::post('manage_domain/store',[ManageDomainController::class,'store']);
Route::post('manage_domain/update/{id}',[ManageDomainController::class,'update']);
Route::delete('manage_domain/delete/{id}',[ManageDomainController::class,'destroy']);

Route::get('manage_ssl',[ManageSSLController::class,'index']);
Route::get('manage_ssl/{id}',[ManageSSLController::class,'edit']);
Route::post('manage_ssl/store',[ManageSSLController::class,'store']);
Route::post('manage_ssl/update/{id}',[ManageSSLController::class,'update']);
Route::delete('manage_ssl/delete/{id}',[ManageSSLController::class,'destroy']);

Route::get('manage_hosting',[ManageHostingController::class,'index']);
Route::get('manage_hosting/{id}',[ManageHostingController::class,'edit']);
Route::post('manage_hosting/store',[ManageHostingController::class,'store']);
Route::post('manage_hosting/update/{id}',[ManageHostingController::class,'update']);
Route::delete('manage_hosting/delete/{id}',[ManageHostingController::class,'destroy']);

Route::get('work_log',[WorkLogController::class,'index']);
Route::get('work_log/{id}',[WorkLogController::class,'edit']);
Route::post('work_log/store',[WorkLogController::class,'store']);
Route::get('work_log/show/{id}',[WorkLogController::class,'show']);
Route::post('work_log/update/{id}',[WorkLogController::class,'update']);
Route::delete('work_log/delete/{id}',[WorkLogController::class,'destroy']);

Route::post('attendance-report-monthly',[ManageAttendanceController::class,'monthlyReport']);

Route::post('apply-leave',[ManageAttendanceController::class,'apply_leave']);

Route::get('manage_role',[EmployeeController::class,'fetchRole']); 
Route::post('manage_role/store',[EmployeeController::class,'storeRole']); 
Route::post('manage_role/fetch',[EmployeeController::class,'fetchRole']); 
Route::get('manage_role/edit/{id}',[EmployeeController::class,'editRole']); 
Route::put('manage_role/update/{id}',[EmployeeController::class,'updateRole']); 
Route::delete('manage_role/delete/{id}',[EmployeeController::class,'roleDestroy']); 

Route::post('assign-leave',[ManageAttendanceController::class,'assign_leave']);

Route::get('manage-leads',[ManageLeadsController::class,'index']);
Route::post('manage-leads/store',[ManageLeadsController::class,'store']);



Route::post('/notifications/store', [ManageDomainController::class, 'expirestore']);
Route::post('/notifications/mark-as-seen', [ManageDomainController::class, 'markAsSeen']);


Route::get('manage-leads/edit/{id}',[ManageLeadsController::class,'edit']);
Route::put('manage-leads/update/{id}',[ManageLeadsController::class,'update']);
Route::post('manage-leads/status/{id}',[ManageLeadsController::class,'status']);

Route::get('schedule-interview',[EmployeeScheduleInterviewController::class,'index']); 
Route::post('schedule-interview/store',[EmployeeScheduleInterviewController::class,'store']); 
Route::get('schedule-interview/edit/{id}',[EmployeeScheduleInterviewController::class,'edit']); 
Route::put('schedule-interview/update/{id}',[EmployeeScheduleInterviewController::class,'update']); 
Route::delete('schedule-interview/delete/{id}',[EmployeeScheduleInterviewController::class,'destroy']); 

Route::post('manage-sale/store',[ManageSalesController::class,'store']);
Route::post('manage-sale/update/{id}',[ManageSalesController::class,'update']);
Route::post('manage-sale/store-invoice',[ManageSalesController::class,'storeInvoice']);
Route::post('manage-sale/update-invoice/{id}',[ManageSalesController::class,'updateInvoice']);
