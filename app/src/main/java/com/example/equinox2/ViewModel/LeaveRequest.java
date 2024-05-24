package com.example.equinox2.ViewModel;
public class LeaveRequest {

    private String leaveType;
    private String from;
    private String to;
    private String startDate;
    private String endDate;
    private String noOfDays;
    private String reason;
    private int leaveImageResId;
    private int approverImageResId;
    private int approveImageResId;
    private  int documentImageResId;

    public LeaveRequest(String leaveType, String from, String to, String startDate, String endDate, String noOfDays, String reason, int leaveImageResId, int approverImageResId,int approveImageResId,int documentImageResId) {
        this.leaveType = leaveType;
        this.from = from;
        this.to = to;
        this.startDate = startDate;
        this.endDate = endDate;
        this.noOfDays = noOfDays;
        this.reason = reason;
        this.leaveImageResId = leaveImageResId;
        this.approverImageResId = approverImageResId;
        this.approveImageResId=approveImageResId;
        this.documentImageResId=documentImageResId;
    }

    // Getters for each field
    public String getLeaveType() { return leaveType; }
    public String getFrom() { return from; }
    public String getTo() { return to; }
    public String getStartDate() { return startDate; }
    public String getEndDate() { return endDate; }
    public String getNoOfDays() { return noOfDays; }
    public String getReason() { return reason; }
    public int getLeaveImageResId() { return leaveImageResId; }
    public int getApproverImageResId() { return approverImageResId; }
    public int getApproveImageResId(){return approveImageResId;}
    public int getDocumentImageResId(){return documentImageResId;}

}
