package laplateforme.guildboard.model;

import laplateforme.guildboard.model.enums.QuestStatus;
import laplateforme.guildboard.model.enums.QuestDifficulty;

import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Max;

@Entity
public class Quest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private QuestStatus status;

    @NotBlank
    @Size(min = 5, max = 100)
    @Column(unique = true, nullable = false) // Check in db
    private String title;

    @NotBlank
    @Size(min = 10, max = 500)
    @Column(nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    private QuestDifficulty difficulty;

    @Min(1)
    private int minLvl;

    @PositiveOrZero
    private int goldReward;

    @Positive
    private int xpReward;

    @PositiveOrZero
    private byte slots;

    @Min(1)
    @Max(100)
    private short successRate;

    @Positive
    private short completionTime;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuestStatus getStatus() {
        return status;
    }

    public void setStatus(QuestStatus status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public QuestDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(QuestDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public int getMinLvl() {
        return minLvl;
    }

    public void setMinLvl(int minLvl) {
        this.minLvl = minLvl;
    }

    public int getGoldReward() {
        return goldReward;
    }

    public void setGoldReward(int goldReward) {
        this.goldReward = goldReward;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }

    public byte getSlots() {
        return slots;
    }

    public void setSlots(byte slots) {
        this.slots = slots;
    }

    public short getSuccessRate() {
        return successRate;
    }

    public void setSuccessRate(short successRate) {
        this.successRate = successRate;
    }

    public short getCompletionTime() {
        return completionTime;
    }

    public void setCompletionTime(short completionTime) {
        this.completionTime = completionTime;
    }

    public Quest(Long id, QuestStatus status, String title, String description, QuestDifficulty difficulty, int minLvl,
            int goldReward, int xpReward, byte slots, short successRate, short completionTime) {
        this.id = id;
        this.status = status;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.minLvl = minLvl;
        this.goldReward = goldReward;
        this.xpReward = xpReward;
        this.slots = slots;
        this.successRate = successRate;
        this.completionTime = completionTime;
    }

    public Quest() {

    }
}
