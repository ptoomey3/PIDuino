#ifndef PIDuinoTasks_OptoStatusUpdater_h
#define PIDuinoTasks_OptoStatusUpdater_h

#include <OptoIn.h>
#include <Scheduler.h>

class OptoStatusUpdater : public ITask
{
  public:
    void setup();
    void run(Scheduler*);
    OptoStatusUpdater(int);
    
  private:
    int _period;
    OptoIn _opto_in;
};

#endif